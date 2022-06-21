/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header/Header'
import constants from '../../constants'
import { resetAuthState } from '../../features/auth/AuthSlice'
import { setCurrentPageKey } from '../../features/navbar/NavbarSlice'
import {
  appendUploadRequests,
  resetUploadRequestState,
} from '../../features/uploadRequest/UploadRequestSlice'
import { useAppDispatch } from '../../store'
import IUploadRequest, { IUploadRequestForm } from '../../types'
import utils from '../../utils'

function Create(): JSX.Element {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<IUploadRequestForm>()
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<IUploadRequestForm>({
    playlist_link: '',
    folder_link: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    type currentPageKeyOptions = keyof typeof constants.pages
    const currentPage = constants.pages.CREATE.key as currentPageKeyOptions
    dispatch(setCurrentPageKey(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hitCreateRequest = (data: string): void => {
    setLoading(true)
    const accessToken = localStorage.getItem('access')

    const axiosConfig = {
      method: 'post',
      url: `${constants.API_URL}/tube2drive/upload-requests/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    }

    axios(axiosConfig)
      .then(response => response.data)
      .then((response: IUploadRequest) => {
        dispatch(appendUploadRequests(response))
        navigate(constants.pages.INDEX.path)
      })
      .catch(async error => {
        setLoading(false)
        if (error?.response?.status === 401) {
          const didRefresh = await utils.refreshToken()
          if (didRefresh) {
            // call `hitCreateRequest` again with new token
            hitCreateRequest(data)
          } else {
            // redirect to login page
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            // remove current user's every state
            dispatch(resetUploadRequestState())
            dispatch(resetAuthState())
            navigate(constants.pages.LOGIN.path)
          }
        } else if (error?.response?.status === 400) {
          if (error?.response?.data?.playlist_link?.length > 0) {
            setErrors({
              playlist_link: error.response.data.playlist_link[0],
              folder_link: '',
            })
          } else if (error?.response?.data?.folder_link?.length > 0) {
            setErrors({
              folder_link: error.response.data.folder_link[0],
              playlist_link: '',
            })
          }
        }
      })
  }

  const onSubmit: SubmitHandler<IUploadRequestForm> = formData => {
    // empty errors
    setErrors({ playlist_link: '', folder_link: '' })
    const data = JSON.stringify(formData)
    hitCreateRequest(data)
  }

  return (
    <>
      <main>
        <Header title={constants.pages.CREATE.header} />
        <section className="form">
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>{constants.pages.CREATE.subheader}</h2>
            <div className="inputs">
              <div className="input-container">
                <label htmlFor="playlist_link">Playlist</label>
                <input
                  type="url"
                  id="playlist_link"
                  placeholder="https://www.youtube.com/playlist?list=PLoel2ZB30FAEdpACztQruvIujFxz0s4wS"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('playlist_link', {
                    required: true,
                  })}
                  aria-invalid={errors.playlist_link ? 'true' : 'false'}
                />
                {errors.playlist_link && (
                  <span role="alert" className="error-item">
                    {errors.playlist_link}
                  </span>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="folder_link">Folder</label>
                <input
                  type="url"
                  id="folder_link"
                  placeholder="https://drive.google.com/drive/folders/1-U4HGXnc23bCKyCpGXSj4ImPVpub821"
                  aria-invalid={errors.folder_link ? 'true' : 'false'}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('folder_link', {
                    required: true,
                  })}
                />
                {errors.folder_link && (
                  <span role="alert" className="error-item">
                    {errors.folder_link}
                  </span>
                )}
              </div>
              <div className="notes">
                <ul>
                  <li>
                    Make sure your gdrive folder is shared with{' '}
                    <em tabIndex={0}>{constants.driveServiceAccountEmail}</em>
                  </li>
                </ul>
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
        <title>{constants.pages.CREATE.title} | Tube2Drive</title>
      </Helmet>
    </>
  )
}

export default Create
