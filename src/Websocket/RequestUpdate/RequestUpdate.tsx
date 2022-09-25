import { w3cwebsocket as W3CWebSocket } from 'websocket'
import constants from '../../constants'
import { selectAuth } from '../../features/auth/AuthSlice'
import {
  updateUploadRequests,
  selectUploadRequest,
  setIsWebsocketConnected,
  setWebsocketClient,
} from '../../features/uploadRequest/UploadRequestSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import IUploadRequest from '../../types'

function RequestUpdate(): void {
  const dispatch = useAppDispatch()
  const { userUuid } = useAppSelector(selectAuth)
  const { isWebsocketConnected } = useAppSelector(selectUploadRequest)

  if (!isWebsocketConnected) {
    const socketUrl = `${constants.WS_URL}/${userUuid}/`

    const client = new W3CWebSocket(socketUrl)
    dispatch(setIsWebsocketConnected(true))

    client.onopen = () => {
      dispatch(setWebsocketClient(client))
      console.info('WebSocket Client Connected')
    }

    client.onclose = () => {
      dispatch(setIsWebsocketConnected(false))
      dispatch(setWebsocketClient(null))
      console.info('WebSocket Client Disconnected')
    }

    client.onmessage = (message: any) => {
      const updatedUploadRequest: null | IUploadRequest = JSON.parse(
        message.data
      )
      if (updatedUploadRequest) {
        dispatch(updateUploadRequests(updatedUploadRequest))
      }
    }
  }
}
export default RequestUpdate
