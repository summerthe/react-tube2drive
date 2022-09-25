import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const getInitialState = (): {
  isAuthenticated: boolean
  userUuid: string | null
} => {
  return {
    isAuthenticated: !!localStorage.getItem('access'),
    userUuid: localStorage.getItem('userUuid'),
  }
}

export const initialState = getInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean
        userUuid: string | null
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.userUuid = action.payload.userUuid
    },
    resetAuthState: () => {
      return getInitialState()
    },
  },
})

export const { setAuthenticated, resetAuthState } = authSlice.actions
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
