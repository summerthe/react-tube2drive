import { configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import navbarReducer from './features/navbar/NavbarSlice'
import authReducer from './features/auth/AuthSlice'
import uploadRequestReducer from './features/uploadRequest/UploadRequestSlice'

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    auth: authReducer,
    uploadRequest: uploadRequestReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
