import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSearchParams } from 'react-router-dom'
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
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<ILoginForm>({
    email: '',
    password: '',
  })

  const { register, handleSubmit } = useForm<ILoginForm>()
  const { isAuthenticated } = useAppSelector(selectAuth)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    type currentPageKeyOptions = keyof typeof constants.pages
    const currentPage = constants.pages.LOGIN.key as currentPageKeyOptions
    dispatch(setCurrentPageKey(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isAuthenticated) {
    // if user is already authenticated navigate to success page
    const nextPage = searchParams.get('next')
    if (nextPage) {
      return utils.navigateTo(nextPage)
    }
    return utils.navigateTo(constants.pages.INDEX.path)
  }

  const onSubmit: SubmitHandler<ILoginForm> = formData => {
    // empty errors
    setLoading(true)
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
        setLoading(false)
        // if login success, set access and refresh token
        const userUuid = response.user.unique_identifier
        localStorage.setItem('access', response.access)
        localStorage.setItem('refresh', response.refresh)
        localStorage.setItem('userUuid', userUuid)
        // set setAuthenticated in store
        dispatch(setAuthenticated({ isAuthenticated: true, userUuid }))
      })
      .catch(error => {
        setLoading(false)
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
                  placeholder={`use \`${constants.apiTestUserEmail}\` for test user`}
                  aria-invalid={errors.email ? 'true' : 'false'}
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
                  placeholder={`use \`${constants.apiTestUserPassword}\` for test user`}
                  aria-invalid={errors.password ? 'true' : 'false'}
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
                <button
                  className="btn btn-primary btn-100"
                  type="submit"
                  disabled={loading}>
                  {loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 loading"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}>
                      <title>Submitting data</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 
                      11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  ) : (
                    'Submit'
                  )}
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
