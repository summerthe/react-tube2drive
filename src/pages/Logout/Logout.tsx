import { useEffect } from 'react'
import constants from '../../constants'
import { resetAuthState } from '../../features/auth/AuthSlice'
import { resetUploadRequestState } from '../../features/uploadRequest/UploadRequestSlice'
import { useAppDispatch } from '../../store'
import utils from '../../utils'

function Logout(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('userUuid')
    // remove current user's every state
    dispatch(resetUploadRequestState())
    dispatch(resetAuthState())
  })
  return utils.navigateTo(constants.pages.LOGIN.path)
}

export default Logout
