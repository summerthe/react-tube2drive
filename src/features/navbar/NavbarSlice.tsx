import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import constants from '../../constants'

type currentPageKeyOptions = keyof typeof constants.pages

export const initialState = {
  currentPageKey: constants.pages.INDEX.key,
  isMobileOpen: false,
}

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setCurrentPageKey: (
      state,
      action: PayloadAction<currentPageKeyOptions>
    ) => {
      state.currentPageKey = action.payload
    },
    toggleIsMobileOpen: state => {
      state.isMobileOpen = !state.isMobileOpen
    },
  },
})

export const { setCurrentPageKey, toggleIsMobileOpen } = navbarSlice.actions
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectNavbar = (state: RootState) => state.navbar
export default navbarSlice.reducer
