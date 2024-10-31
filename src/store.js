import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/slices/userSlice'
import rolesSlice from './features/slices/rolesSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    roles: rolesSlice,
  },
})