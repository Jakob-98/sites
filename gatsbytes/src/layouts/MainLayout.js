import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
