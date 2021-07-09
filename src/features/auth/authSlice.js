import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    loggedInUser: '',
  },
  reducers: {
    toggleLoggedIn: (state, action) => {
      return {...state, loggedIn: action.payload}
    },
    setLoggedInUser: (state, action) => {
      return { ...state, loggedInUser: action.payload }
    },
  },
})

export const { toggleLoggedIn, setLoggedInUser } = authSlice.actions

export default authSlice.reducer
