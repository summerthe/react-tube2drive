import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../../components/Header/Header'
import constants from '../../constants'
import { setCurrentPageKey } from '../../features/navbar/NavbarSlice'
import { useAppDispatch } from '../../store'

function Login(): JSX.Element {
  const dispatch = useAppDispatch()
  useEffect(() => {
    type currentPageKeyOptions = keyof typeof constants.pages
    const currentPage = constants.pages.LOGIN.key as currentPageKeyOptions
    dispatch(setCurrentPageKey(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <main>
        <Header title={constants.pages.LOGIN.header} />
        <section className="form">
          <form method="POST">
            <h2>{constants.pages.LOGIN.subheader}</h2>
            <div className="inputs">
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="use `email@gmail.com` for testing"
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="use `password` for testing"
                />
              </div>
              <div className="errors">
                <ul>
                  <li>Error 1</li>
                  <li>Error 2</li>
                </ul>
              </div>
              <div className="input-container">
                <button className="btn btn-primary btn-100" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Helmet>
        <title>{constants.pages.LOGIN.title} | Tube2Drive</title>
      </Helmet>
    </>
  )
}

export default Login
