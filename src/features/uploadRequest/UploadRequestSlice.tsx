import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import IUploadRequest from '../../types'

export const initialState: {
  uploadRequests: IUploadRequest[]
  hasFetched: boolean
} = {
  uploadRequests: [],
  hasFetched: false,
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
    appendUploadRequests: (state, action: PayloadAction<IUploadRequest>) => {
      state.uploadRequests.push(action.payload)
    },
    resetUploadRequestState: () => {
      return initialState
    },
  },
})

export const {
  setUploadRequests,
  setFetched,
  appendUploadRequests,
  resetUploadRequestState,
} = uploadRequestSlice.actions
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectUploadRequest = (state: RootState) => state.uploadRequest
export default uploadRequestSlice.reducer
