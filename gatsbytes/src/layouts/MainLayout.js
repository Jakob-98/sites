import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
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
