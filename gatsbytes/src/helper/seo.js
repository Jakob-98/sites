import React from 'react';
import { Helmet } from 'react-helmet';



const SEO = ({ title, description, url, image, date }) => {
    const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": title,
    "image": [image],
    "datePublished": date,
    "author": {
      "@type": "Person",
      "name": "Jakob Serlier"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ramblings of Jakob Serlier",
      "logo": {
        "@type": "ImageObject",
        "url":  "https://jakobs.dev/favicon.ico"
      }
    },
    "description": description
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
