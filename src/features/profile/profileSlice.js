import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchLoggedInUser = createAsyncThunk("profile/fetchLoggedInUser", async(loggedInUserToken)=> {
  const res = await axios.get('https://felicidad-api.herokuapp.com/users/', { headers: { Authorization: loggedInUserToken } })
  return res.data
})

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loggedInUser: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, loggedInuser: action.payload }
    },
  },
  extraReducers: {
    [fetchLoggedInUser.pending]: (state, action) => {
      state.status = "pending"
    },
    [fetchLoggedInUser.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.user
      state.status = "fullfilled"
    },
    [fetchLoggedInUser.error]: (state, action) => {
      state.error = action.error.message
      state.status = "error"
    },
  }
})
export const { setUser } = profileSlice.actions

export default profileSlice.reducer
