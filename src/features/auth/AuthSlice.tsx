import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const initialState = {
  // Convert to boolean
  isAuthenticated: !!localStorage.getItem('access'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const { setAuthenticated } = authSlice.actions
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
