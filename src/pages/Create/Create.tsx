/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import axios, { AxiosRequestConfig } from 'axios'
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

  const hitCreateRequest = (axiosConfig: AxiosRequestConfig): void => {
    axios(axiosConfig)
      .then(response => response.data)
      .then((response: IUploadRequest) => {
        dispatch(appendUploadRequests(response))
        navigate(constants.pages.INDEX.path)
      })
      .catch(async error => {
        if (error?.response?.status === 401) {
          const didRefresh = await utils.refreshToken()
          if (didRefresh) {
            // call `hitCreateRequest` again with new token
            hitCreateRequest(axiosConfig)
          } else {
            // redirect to login page
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            // remove current user's every state
            dispatch(resetUploadRequestState())
            dispatch(resetAuthState())
            navigate(constants.pages.LOGIN.path)
          }
        }
      })
  }

  const onSubmit: SubmitHandler<IUploadRequestForm> = formData => {
    // empty errors
    setErrors({ playlist_link: '', folder_link: '' })
    const data = JSON.stringify(formData)
    const accessToken = localStorage.getItem('access')

    const config = {
      method: 'post',
      url: `${constants.API_URL}/tube2drive/upload-requests/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    }
    hitCreateRequest(config)
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
                <button className="btn btn-primary btn-100" type="submit">
                  Submit
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
