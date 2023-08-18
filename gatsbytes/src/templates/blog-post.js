import * as React from "react"
import { graphql, Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'
import SEO from '../helper/seo';

export default function BlogPost({ data }) {
  // Ensure that markdownRemark is not null
  if (!data.markdownRemark) {
    return <div>No post found</div>
  }

  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  // TODO remove hardcode:
  const siteUrl = "https://jakobs.dev"; // You can also fetch this from your siteMetadata in gatsby-config.js

  return (
    <MainLayout>
      {/* Add the SEO component here */}
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || "Default description"}
        url={siteUrl + frontmatter.path}
        image={frontmatter.image ? frontmatter.image : "default-image-url.jpg"}
      />
      <div className="main-content">
        <h2>{frontmatter.title}</h2>
        <h4>{frontmatter.date}</h4>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
        <Link to="/">Back to Home</Link>
      </div>
    </MainLayout>
  )
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
`
