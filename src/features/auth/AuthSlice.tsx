import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const getInitialState = (): { isAuthenticated: boolean } => {
  return {
    isAuthenticated: !!localStorage.getItem('access'),
  }
}

export const initialState = getInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
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
