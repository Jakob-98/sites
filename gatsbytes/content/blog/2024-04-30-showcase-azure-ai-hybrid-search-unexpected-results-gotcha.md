---
title: "Showcase: Azure AI Hybrid Search unexpected results gotcha"
date: "2024-04-30"
path: "/showcase-azure-ai-hybrid-search-unexpected-results-gotcha"
image: "https://jakobs.dev/media/jakobsdev.png"
description: "Showcase: Azure AI Hybrid Search unexpected results gotcha"
tags: ["Azure AI Search", "Embeddings", "Search", "tech"]
---
# Showcase: Azure AI Hybrid Search unexpected results gotcha

This document describes a gotcha in Azure AI Search hybrid queries where unexpected results are returned.

The context is of these findings are an ISE engagement with a customer indexing millions of documents in Azure AI Search. During this, I set out to answer questions on filering and matching syntax as well as pre/post-filter performance for hybrid search. Views and opinions are my own.

## Key takeaway

Traditional full-text search return matches if and only if there is a match. Vector search always returns `k` number of matches, which can be nonsensical (see [here](https://learn.microsoft.com/en-us/azure/search/vector-search-how-to-query?tabs=query-2023-11-01%2Cfilter-2023-11-01#quantity-of-ranked-results-in-a-vector-query-response)). Given the way hybrid search reranks the sum of results from full-text and vector search, hybrid search can return results which would not be expected given (regex) matching constraints in the `search_text` argument.

If you are simply filtering on a field, use `filter` [(filter syntax refs)](https://learn.microsoft.com/en-us/azure/search/search-query-odata-filter). This is a 'hard' filter, meaning that results which do not match are not included in the end-results for (hybrid) search.

## Brief reiteration on search methods

Azure AI Search offers these three search methods:

1. Keyword search: fulltext and semantic
    1. Fulltext: `queryType` sets the parser: simple, or full. The default simple query parser is optimal for full text search. Full enables Lucene query parser: for advanced query constructs like regular expressions, proximity search, fuzzy and wildcard search. [Full-text query how-to - Azure AI Search | Microsoft Learn](https://learn.microsoft.com/en-us/azure/search/search-query-create?tabs=portal-text-query)
    1. Semantic: Semantic ranker is a collection of query-related capabilities that improve the quality of an initial BM25-ranked or RRF-ranked search result for text-based queries. When you enable it on your search service, semantic ranking extends the query execution pipeline in two ways:
        1. Secondary ranking score & captions and answers in the response.  [Semantic ranking - Azure AI Search | Microsoft Learn](https://learn.microsoft.com/en-us/azure/search/semantic-search-overview)
1. Vector search: [docs](https://learn.microsoft.com/en-us/azure/search/vector-search-overview) - uses embeddings and distance in latent space to retrieve semantically relevant documents.
1. Hybrid search: combines both results, and reranks, e.g. using RRF [(docs)](https://learn.microsoft.com/en-us/azure/search/hybrid-search-how-to-query)

## Technique - filtering and matching documents in Azure AI Search

For matching and filtering documents, these two approaches were most useful for our use-cases:

1. Using OData language and `filter` argument: [OData language overview - Azure AI Search | Microsoft Learn](https://learn.microsoft.com/en-us/azure/search/query-odata-filter-orderby-syntax)
1. Using the `search_text` argument and `query_type="full"` so we are able to use the Lucene queryparser syntax: we can match results e.g., using regular expressions [Lucene query syntax - Azure AI Search | Microsoft Learn](https://learn.microsoft.com/en-us/azure/search/query-lucene-syntax).

## Gotcha example - Where things turn sour

Imagine the following query. We are interesed in filtering on a specific id (the full set only contains one document with this ID), but we also match the id to contain `1234` using a regex lucene query. Obviously, this matches and we get a result:

```python
limit = 10
select = 'id,content'
search_text = "id:/.*1234.*/"
search_client = sc
result = await search_client.search(
        search_text=search_text,
        top=limit,
        select=select,
        query_type="full",  # Set query type to full to enable lucene/regex queries
        filter = "id eq 'A001-AB-1234_chunk_0'"
    )
async for doc in result:
    print(doc)

# >
# {'id': 'A001-AB-1234_chunk_0', 'content':....
#
```

Now, we change the regex query to (not) match `4321` in the id, and we obviously get no result:

```python
limit = 10
select = 'id,content'
search_text = "id:/.*4321.*/"
search_client = sc
result = await search_client.search(
        search_text=search_text,
        top=limit,
        select=select,
        query_type="full",  # Set query type to full to enable lucene/regex queries
        filter = "id eq 'A001-AB-1234_chunk_0'"
    )
async for doc in result:
    print(doc)

# >
# NO RESULTS
#
```

What happens if we add hybrid search to the mix, but still include the unmatching `4321` in the id?

``` python
# Hybrid search with regex-like query, yielding unexpected (1234) result (hybrid).
# (using helper function to set up the embedding, ...)
async for doc in await vector_search_with_lucene(
    limit=10,
    query_to_embed="failing gear unit", # some query which closely resembles the text in the content
    search_text = "id:/.*4321.*/",
    query_type= "full",
    select='id,content',
    search_client=sc,
    vector_filter_mode="preFilter",
    filter = "id eq 'A001-AB-1234_chunk_0'"
):
    print(doc)

# >
# {'id': 'A001-AB-1234_chunk_0', 'content':....
#
```

Notice how in this case, we *do* get the result back, but the id doesn't match the regex query.

**Reasoning**:

Azure AI Hybrid search reranks documents after both the vector search and fulltext search are finished. The `search_text` argument allows for strict (regex) matching, but this matching only applies to the fulltext search. Since we pre-filter on a specific document, vector search will always yield this result (note: this holds even if the neighbour of the embedded query isn't too similar, since we always try to return 10 results - which then must include our single document). After both the vector and text search are executed, the hybrid results includes results which would not be expected from just full-text search.
