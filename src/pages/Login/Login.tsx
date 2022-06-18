import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm, SubmitHandler } from 'react-hook-form'
import Header from '../../components/Header/Header'
import constants from '../../constants'
import { selectAuth, setAuthenticated } from '../../features/auth/AuthSlice'
import { setCurrentPageKey } from '../../features/navbar/NavbarSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import { ILoginForm, ILoginFormResponse } from '../../types'
import utils from '../../utils'

function Login(): JSX.Element {
  const dispatch = useAppDispatch()

  const [errors, setErrors] = useState<ILoginForm>({
    email: '',
    password: '',
  })

  const { register, handleSubmit } = useForm<ILoginForm>()

  useEffect(() => {
    type currentPageKeyOptions = keyof typeof constants.pages
    const currentPage = constants.pages.LOGIN.key as currentPageKeyOptions
    dispatch(setCurrentPageKey(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { isAuthenticated } = useAppSelector(selectAuth)

  if (isAuthenticated) {
    // if user is already authenticated navigate to home page
    return utils.navigateTo(constants.pages.INDEX.path)
  }

  const onSubmit: SubmitHandler<ILoginForm> = formData => {
    // empty errors
    setErrors({ email: '', password: '' })
    const data = JSON.stringify(formData)

    const config = {
      method: 'post',
      url: `${constants.API_URL}/auth/login/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    axios(config)
      .then(response => response.data)
      .then((response: ILoginFormResponse) => {
        // if login success, set access and refresh token
        localStorage.setItem('access', response.access)
        localStorage.setItem('refresh', response.refresh)
        // set setAuthenticated in store
        dispatch(setAuthenticated(true))
      })
      .catch(error => {
        // if fails show error
        if (error?.response?.status === 401) {
          if (error?.response?.data?.detail) {
            setErrors({ email: '', password: error?.response?.data?.detail })
          }
        }
      })
  }

  return (
    <>
      <main>
        <Header title={constants.pages.LOGIN.header} />
        <section className="form">
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>{constants.pages.LOGIN.subheader}</h2>
            <div className="inputs">
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="use `email@gmail.com` for testing"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('email', {
                    required: true,
                  })}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="use `password` for testing"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('password', {
                    required: true,
                  })}
                />
                {errors.password && (
                  <span role="alert" className="error-item">
                    {errors.password}
                  </span>
                )}
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
