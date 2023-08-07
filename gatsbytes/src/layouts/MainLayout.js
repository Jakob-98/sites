import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../styles/global.css" // import global styles


const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='content-center'>
      {children}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
