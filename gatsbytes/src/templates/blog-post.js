import * as React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from 'react-helmet';
import MainLayout from '../layouts/MainLayout';
import SEO from '../helper/seo';

export default function BlogPost({ data }) {

  const markdownRemark = data?.markdownRemark;
  const frontmatter = markdownRemark?.frontmatter;
  const html = markdownRemark?.html;
  const siteUrl = "https://jakobs.dev";  // Consider moving this to a global config or using Gatsby's site metadata.

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
    <MainLayout>
      <Helmet>
        <link rel="stylesheet" href="https://latest.cactus.chat/style.css" type="text/css" />
        <script type="text/javascript" src="https://latest.cactus.chat/cactus.js"></script>
      </Helmet>

      <SEO
        title={frontmatter.title}
        description={frontmatter.description || "Default description"}
        url={siteUrl + frontmatter.path}
        image={frontmatter.image ? frontmatter.image : "default-image-url.jpg"}
        date={frontmatter.date}
      />
      
      <div className="main-content">
        <h2>{frontmatter.title}</h2>
        <h4>{frontmatter.date} • Written by Jakob Serlier</h4>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
        <Link to="/">Back to Home</Link>
        <div id="comment-section">comments</div>
      </div>
    </MainLayout>
  );
}

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        image
      }
    }
  }
`;
