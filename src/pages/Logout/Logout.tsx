import { useEffect } from 'react'
import constants from '../../constants'
import { setAuthenticated } from '../../features/auth/AuthSlice'
import { useAppDispatch } from '../../store'
import utils from '../../utils'

function Logout(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    dispatch(setAuthenticated(false))
  })
  return utils.navigateTo(constants.pages.LOGIN.path)
}

export default Logout
