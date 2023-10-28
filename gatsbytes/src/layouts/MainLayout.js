import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAnalytics from '../helper/googleanalytics';
import 'prismjs/themes/prism-okaidia.css';
import "../styles/global.css"

const MainLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'Ramblings of Jakob Serlier' },
          { name: 'keywords', content: 'jakob, serlier, blog, personal site, technology, Deep Learning, AI, LLM' },
        ]}
      />
      <Header />
      <div className='content-center'>
        {children}
      </div>
      <Footer />
      <GoogleAnalytics/>
    </div>
  )
}

export default MainLayout
