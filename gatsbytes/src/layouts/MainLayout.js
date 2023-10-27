import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAnalytics from '../helper/googleanalytics';
import 'prismjs/themes/prism-okaidia.css';  // Dark theme
import "../styles/global.css" // import global styles

const MainLayout = ({ children }) => {
  return (
    <div>
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
