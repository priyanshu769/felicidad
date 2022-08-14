import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchLoggedInUser = createAsyncThunk(
  'profile/fetchLoggedInUser',
  async (loggedInUserToken) => {
    try {
      const res = await axios.get('https://felicidad-api.herokuapp.com/users/', {
        headers: { Authorization: loggedInUserToken },
      })
      if (res.data.success) {
        return res.data
      } else return { username: 'user', name: 'User', profilePic: '' }
    } catch (error) {
      console.log(error, "Unable to fetch loggedInUser")
    }
  },
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loggedInUser: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, loggedInuser: action.payload }
    },
    setProfileStatus: (state, action) => {
      state.status = action.payload
    },
    setProfileError: (state, action) => {
      state.error = action.payload
    },
    profileFollowed: (state, action) => {
      state.loggedInUser = { ...state.loggedInUser, following: [...state.loggedInUser.following, action.payload] }
    },
    profileUnfollowed: (state, action) => {
      const newFollowingList = state.loggedInUser.following.filter(userId => userId !== action.payload)
      state.loggedInUser = { ...state.loggedInUser, following: newFollowingList }
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
    },
    postBookmarkedByUser: (state, action) => {
      const bookmarked = state.loggedInUser.bookmarks.find(bookmarkId => bookmarkId === action.payload.postId)
      if (bookmarked) {
        return { ...state, loggedInUser: { ...state.loggedInuser, bookmarks: state.loggedInUser.bookmarks.filter(bookmarkId => bookmarkId !== action.payload.postId) } }
      } else {
        return { ...state, loggedInUser: { ...state.loggedInUser, bookmarks: [...state.loggedInUser.bookmarks, action.payload.postId] } }
      }
    },
  },
    extraReducers: {
      [fetchLoggedInUser.pending]: (state, action) => {
        state.status = 'pending'
      },
      [fetchLoggedInUser.fulfilled]: (state, action) => {
        state.loggedInUser = action.payload.user
        state.status = 'fullfilled'
      },
      [fetchLoggedInUser.error]: (state, action) => {
        state.error = action.error.message
        state.status = 'error'
      },
    },
  })
export const {
  setUser,
  setProfileError,
  setProfileStatus,
  profileFollowed,
  profileUnfollowed,
  setLoggedInUser,
  postBookmarkedByUser
} = profileSlice.actions

export default profileSlice.reducer
