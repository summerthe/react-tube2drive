import axios from 'axios'
import React from 'react'
import { Navigate } from 'react-router-dom'
import constants from './constants'
import { IAccessTokenResponse } from './types'

const utils = {
  navigateTo: (path: string): JSX.Element => <Navigate to={path} replace />,
  refreshToken: (): Promise<boolean> => {
    // Try to refresh token and returns whether able to refresh access token or not.
    const data = JSON.stringify({
      refresh: localStorage.getItem('refresh'),
    })

    const config = {
      method: 'post',
      url: `${constants.API_URL}/auth/refresh-token/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    return axios(config)
      .then(response => response.data)
      .then((response: IAccessTokenResponse) => {
        localStorage.setItem('access', response.access)
        return true
      })
      .catch(() => {
        return false
      })
  },
  toTitleCase: (_string: string): string => {
    const sentence = _string.toLowerCase().split(' ')
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
    }
    return sentence.join(' ')
  },
}
export default utils
