import * as React from "react"
import { graphql, Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'
import PinnedRepos from '../components/PinnedRepos'
import LinkWithPreview from "../components/LinkWithPreview"
import ChatComponent from "../components/Chat"
// import ScreenshotCard from '../components/ScreenshotCard';
import { groupBy } from 'lodash';

import jakobsdevPreview from '../assets/linkpreviews/jakobsdev.png';


const HomePage = ({ data }) => {
  const techPosts = data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.tags && post.node.frontmatter.tags.includes('tech'));
  const miscPosts = data.allMarkdownRemark.edges.filter(post => !post.node.frontmatter.tags || !post.node.frontmatter.tags.includes('tech'));

  return (
    <MainLayout>
      <div className="content-wrapper">
        <div className="main-content">
          <h2>Jakobs.dev</h2>
          <p>
            Welcome to the homepage of Jakob Serlier.
          </p>
          <h2>Posts</h2>
          <h4>Tech & longread</h4>
          <ul>
            {techPosts.map(post => (
              <div key={post.node.id} className="posts">
                <li>
                  {post.node.frontmatter.date} - {" "}
                  <Link to={post.node.frontmatter.path}>
                    {post.node.frontmatter.title}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
          <h4>Bytesize & Misc</h4>
          <ul>
            {miscPosts.map(post => (
              <div key={post.node.id} className="posts">
                <li>
                  {post.node.frontmatter.date} - {" "}
                  <Link to={post.node.frontmatter.path}>
                    {post.node.frontmatter.title}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
          <h2 class="hover-hint">Links</h2>
          <ul>
            <li>
              <LinkWithPreview url="https://selitic.com"> Selitic.com - digital entrepreneurship </LinkWithPreview>
            </li>
            <h3>Archives</h3>
            <ul>
              <li>
                <LinkWithPreview url="https://archive.jakobs.dev" screenshotUrl={jakobsdevPreview}>
                  2018-2023 personal site
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview url="https://archive.jakobs.dev/1kb" target="_blank">1kb club entry - 622 bytes site</LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview url="https://taaldenker.jakobs.dev/" target="_blank">Landing page for my mother's published book</LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview url="https://archive.jakobs.dev/archaic" target="_blank">Oldest surviving personal site</LinkWithPreview>
              </li>
            </ul>
            <h3>Misc. domains</h3>
            <ul>
              <li><a href="https://data.gy" target="_blank">data.gy</a></li>
              <li><a href="https://hi.gy" target="_blank">hi.gy</a></li>
              <li><a href="https://jakobu.com" target="_blank">jakobu.com</a></li>
              <li><a href="https://delft.dev" target="_blank">delft.dev</a></li>
              <li><a href="https://shortlogs.com" target="_blank">shortlogs.com</a></li>
            </ul>
          </ul>
          <h2>Selected content & projects</h2>
          <ul>
            <li>
              <a href="https://github.com/Jakob-98/openai-functools/blob/main/README.md">
                openai-functools - Simplified Generation of OpenAI Functions JSON Metadata for OpenAI gpt-3.5-turbo-0613 and gpt-4-0613.
              </a>
            </li>
            <li>
              <a href="https://hi.gy/t">
                Lightweight wildlife classification on the edge: outperforming state-of-the-art benchmark models under constrained conditions with a novel approach for efficient wildlife image classification on edge devices.
              </a>
            </li>
            <li>
              <a href="https://github.com/Jakob-98/sites">
                Repository containing various sites, including this one.
              </a>
            </li>
          </ul>
        </div>
        <div className="side-content">
          <h2>Chat with the Jakob-Bot</h2>
          <p>Chat with the custom-built Jakob-AI agent below and get to know about my work and academic experience!</p>
          <ChatComponent />
          <PinnedRepos />

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
            tags
          }
        }
      }
    }
  }
`

export default HomePage;
