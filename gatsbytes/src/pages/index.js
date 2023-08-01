import * as React from "react"
import { graphql, Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'
import PinnedRepos from '../components/PinnedRepos'

const HomePage = ({ data }) => {
  return (
    <MainLayout>
      <div className="content-wrapper">
        <div className="main-content">
          <h2>Jakob</h2>
          <h2>Home</h2>
          <p>This is my homepage. There are many like it, but this one is mine.</p>
          <h2>Posts</h2>
          {data.allMarkdownRemark.edges.map(post => (
            <div key={post.node.id}>
              <Link to={post.node.frontmatter.path}>
                * {post.node.frontmatter.date} - {post.node.frontmatter.title}
              </Link>
            </div>
          ))}
        <h2>Links</h2>
        </div>
        <div className="side-content">
          <PinnedRepos/>
        </div>
      </div>
    </MainLayout>
  )
}


export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
          }
        }
      }
    }
  }
`

export default HomePage;
