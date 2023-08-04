import * as React from "react"
import { Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="main-content">
        <div>
          <p>Whoops, that's a 404.</p>
        </div>
        <Link to="/">Back to Home</Link>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage;
