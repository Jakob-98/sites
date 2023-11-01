import * as React from "react";
import { graphql, Link } from "gatsby";
import MainLayout from '../layouts/MainLayout';
import SEO from '../helper/seo';

export default function BlogPost({ data }) {
  const markdownRemark = data?.markdownRemark;
  const frontmatter = markdownRemark?.frontmatter;
  const html = markdownRemark?.html;
  const siteTitle = data.site.siteMetadata.title;
  const siteUrl = data.site.siteMetadata.siteUrl;

  React.useEffect(() => {
    if (frontmatter && typeof window !== "undefined" && typeof window.initComments === "function") {
      window.initComments({
        node: document.getElementById("comment-section"),
        defaultHomeserverUrl: "https://matrix.cactus.chat:8448",
        serverName: "cactus.chat",
        siteName: "jakobsdev",
        commentSectionId: frontmatter.title.toLowerCase().replace(/\s+/g, '').substring(0, 15),
      });
    }
  }, [frontmatter]);

  if (!markdownRemark) {
    return <div>No post found</div>;
  }

  return (
    <MainLayout pageTitle={frontmatter.title}>
      <helmet>
        <link rel="canonical" href={`${siteUrl}${frontmatter.path}`} />
      </helmet>
      <SEO
        title={`${frontmatter.title} | ${siteTitle}`}
        description={frontmatter.description || "Default description"}
        url={siteUrl + frontmatter.path}
        image={frontmatter.image ? frontmatter.image : "default-image-url.jpg"}
        date={frontmatter.date}
      />
      <div className="main-content">
        <h2>{frontmatter.title}</h2>
        <h4>{frontmatter.date} • Written by Jakob Serlier</h4>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <h6>Tags: {frontmatter.tags.join(', ')}</h6>
        )}
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
        <Link to="/">Back to Home</Link>
        <div id="comment-section"></div>
      </div>
    </MainLayout>
  );
}

export const query = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        image
        tags
      }
    }
  }
`;
