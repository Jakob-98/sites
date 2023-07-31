import * as React from "react"
import { Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'

const AboutPage = () => {
  return (
    <MainLayout>
      <h2>About</h2>
      <p>This is the about page.</p>
      <h2>Our Team</h2>
      <div>
        <p>John Doe - CEO</p>
      </div>
      <Link to="/">Back to Home</Link>
    </MainLayout>
  )
}

export default AboutPage
