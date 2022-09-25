import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { RootState } from '../../store'
import IUploadRequest from '../../types'

export const initialState: {
  uploadRequests: IUploadRequest[]
  hasFetched: boolean
  isWebsocketConnected: boolean
  websocketClient: W3CWebSocket | null
} = {
  uploadRequests: [],
  hasFetched: false,
  isWebsocketConnected: false,
  websocketClient: null,
}

const uploadRequestSlice = createSlice({
  name: 'uploadRequest',
  initialState,
  reducers: {
    setUploadRequests: (state, action: PayloadAction<IUploadRequest[]>) => {
      state.uploadRequests = action.payload
    },
    setFetched: (state, action: PayloadAction<boolean>) => {
      state.hasFetched = action.payload
    },
    setIsWebsocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isWebsocketConnected = action.payload
    },
    setWebsocketClient: (state, action: PayloadAction<W3CWebSocket | null>) => {
      state.websocketClient = action.payload
    },

    appendUploadRequests: (state, action: PayloadAction<IUploadRequest>) => {
      state.uploadRequests.unshift(action.payload)
    },
    updateUploadRequests: (state, action: PayloadAction<IUploadRequest>) => {
      const uploadRequestsIndex = state.uploadRequests.findIndex(
        uploadRequest => uploadRequest.id === action.payload.id
      )
      if (uploadRequestsIndex !== -1) {
        state.uploadRequests[uploadRequestsIndex] = action.payload
      }
    },

    removeUploadRequests: (state, action: PayloadAction<number>) => {
      state.uploadRequests = state.uploadRequests.filter(
        uploadRequest => uploadRequest.id !== action.payload
      )
    },
    resetUploadRequestState: state => {
      if (state.websocketClient) {
        // closing websocket connection
        state.websocketClient.close()
      }
      return initialState
    },
  },
})

export const {
  setUploadRequests,
  setFetched,
  setIsWebsocketConnected,
  setWebsocketClient,
  appendUploadRequests,
  updateUploadRequests,
  removeUploadRequests,
  resetUploadRequestState,
} = uploadRequestSlice.actions
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectUploadRequest = (state: RootState) => state.uploadRequest
export default uploadRequestSlice.reducer
