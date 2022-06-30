import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import constants from '../../constants'
import { selectAuth } from '../../features/auth/AuthSlice'
import { useAppSelector } from '../../store'
import utils from '../../utils'

function ProtectedRoutes(): JSX.Element {
  const { isAuthenticated } = useAppSelector(selectAuth)
  const location = useLocation()

  return isAuthenticated ? (
    <Outlet />
  ) : (
    utils.navigateTo(`${constants.pages.LOGIN.path}?next=${location.pathname}`)
  )
}

export default ProtectedRoutes
