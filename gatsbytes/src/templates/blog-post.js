import * as React from "react"
import { graphql } from "gatsby"
import MainLayout from '../layouts/MainLayout'

export default function BlogPost({ data }) {
  // Ensure that markdownRemark is not null
  if (!data.markdownRemark) {
    return <div>No post found</div>
  }

  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <MainLayout>
      <h2>{frontmatter.title}</h2>
      <h4>{frontmatter.date}</h4>
      <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
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
      }
    }
  }
`
