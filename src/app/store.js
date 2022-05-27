import { configureStore } from '@reduxjs/toolkit'
import timelineReducer from '../features/timeline/timelineSlice'
import profileReducer from '../features/profile/profileSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    profile: profileReducer,
    auth: authReducer
  },
})
