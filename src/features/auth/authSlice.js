import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginUserObj) => {
    const res = await axios.post(
      'https://felicidad-api.cyclic.app/login',
      loginUserObj,
    )
    if (res.data.success) {
      localStorage.setItem(
        'loggedInToken',
        JSON.stringify({ token: res.data.token }),
      )
    }
    return res.data
  },
)
export const signupUser = createAsyncThunk(
  'auth/signupNewUser',
  async (newUserObj) => {
    const res = await axios.post(
      'https://felicidad-api.cyclic.app/signup',
      newUserObj,
    )
    if (res.data.success) {
      localStorage.setItem(
        'loggedInToken',
        JSON.stringify({ token: res.data.token }),
      )
    }
    return res.data
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedInToken: null,
    status: 'Logged Out',
    error: null,
  },
  reducers: {
    setLoggedInToken: (state, action) => {
      return { ...state, loggedInToken: action.payload }
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = 'Logging In'
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.success && action.payload.token) {
        state.loggedInToken = action.payload.token
        state.status = 'Logged In'
      } else state.status = 'Error Logging In'
    },
    [loginUser.error]: (state, action) => {
      state.error = action.error.message
      state.status = 'Error Logging In'
    },
    [signupUser.pending]: (state, action) => {
      state.status = 'Signing Up'
    },
    [signupUser.fulfilled]: (state, action) => {
      state.loggedInToken = action.payload.token
      state.status = 'Signed Up'
    },
    [signupUser.error]: (state, action) => {
      state.error = action.error.message
      state.status = 'Error Signing Up'
    },
  },
})

export const { setLoggedInToken } = authSlice.actions

export default authSlice.reducer
