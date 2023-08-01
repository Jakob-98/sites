import * as React from "react"
import { Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="main-content">
        <h2>Our Team</h2>
        <div>
          <p>Jakob Serlier - CEO, founder, executive geek, ...</p>
        </div>
        <Link to="/">Back to Home</Link>
      </div>
    </MainLayout>
  )
}

export default AboutPage
