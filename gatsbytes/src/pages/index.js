import * as React from "react"
import { graphql, Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'
import PinnedRepos from '../components/PinnedRepos'
import LinkWithPreview from "../components/LinkWithPreview"
// import ScreenshotCard from '../components/ScreenshotCard';

import jakobsdevPreview from '../assets/linkpreviews/jakobsdev.png';


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
          <ul>
            <LinkWithPreview url="https://selitic.com"> Selitic.com - digital entrepreneurship </LinkWithPreview>
            <li><a href="selilic.com" target="_blank">Selitic.com - digital entrepreneurship</a></li>
            <h3>Archives</h3>
            <li><a href="https://archive.jakobs.dev" target="_blank">2016-2023 personal site</a></li>
            <li><a href="https://archive.jakobs.dev/1kb" target="_blank">1kb club entry - 622 bytes total weight</a></li>
            <li><a href="https://archive.jakobs.dev/archaic" target="_blank">First personal site</a></li>
            <LinkWithPreview url="https://archive.jakobs.dev" screenshotUrl={jakobsdevPreview}>
              2016-2023 personal site
            </LinkWithPreview>

            <h3>Misc. domains</h3>
            <li><a href="https://archive.jakobs.dev" target="_blank">Previous personal site</a></li>
          </ul>
          <PinnedRepos />
        </div>
        <div className="side-content">
          <h2>Selected content & projects</h2>
          <ul>
            <li>
              <LinkWithPreview url="https://github.com/Jakob-98/openai-functools/blob/main/README.md">openai-functools - Simplified Generation of OpenAI Functions JSON Metadata for OpenAI gpt-3.5-turbo-0613 and gpt-4-0613</LinkWithPreview>
            </li>
          </ul>
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
