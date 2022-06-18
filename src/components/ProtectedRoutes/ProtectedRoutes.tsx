import constants from '../../constants'
import { selectAuth } from '../../features/auth/AuthSlice'
import { useAppSelector } from '../../store'
import utils from '../../utils'

function ProtectedRoutes({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthenticated } = useAppSelector(selectAuth)

  return isAuthenticated
    ? children
    : utils.navigateTo(constants.pages.LOGIN.path)
}

export default ProtectedRoutes
