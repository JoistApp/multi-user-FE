import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})