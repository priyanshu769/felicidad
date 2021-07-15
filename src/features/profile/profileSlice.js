import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: "",
    status: 'idle',
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload }
    },
    addToFollowing: (state, action) => {
      return {...state, user: {...state.user, following: [...state.user.following, action.payload]}}
    },
    removeFromFollowing: (state, action) => {
      return {...state, user: {...state.user, following: state.user.following.filter(user => user !== action.payload)}}
    },
    updateName: (state, action) => {
      return (state.user.name = action.payload)
    },
  },
})
export const { setUser, addToFollowing, removeFromFollowing, updateName } = profileSlice.actions

export default profileSlice.reducer
