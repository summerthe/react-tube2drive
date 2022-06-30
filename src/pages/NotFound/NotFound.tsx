import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import constants from '../../constants'

function NotFound(): JSX.Element {
  return (
    <>
      <main>
        <Header title={constants.pages.NOT_FOUND.header} />
        <section className="form">
          <h2>Page Not Found.</h2>
          <Link to={constants.pages.INDEX.path} className="btn mt-10">
            Go back to Home.
          </Link>
        </section>
      </main>
      <Helmet>
        <title>{constants.pages.NOT_FOUND.title} | Tube2Drive</title>
      </Helmet>
    </>
  )
}

export default NotFound
