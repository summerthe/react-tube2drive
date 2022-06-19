/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { useLocation } from 'react-router-dom'
import constants from '../../constants'
import { selectAuth } from '../../features/auth/AuthSlice'
import { useAppSelector } from '../../store'
import utils from '../../utils'

function ProtectedRoutes({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthenticated } = useAppSelector(selectAuth)
  const location = useLocation()

  return isAuthenticated
    ? children
    : utils.navigateTo(
        `${constants.pages.LOGIN.path}?next=${location.pathname}`
      )
}

export default ProtectedRoutes
