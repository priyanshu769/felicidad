import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk('/timeline/fetchPosts', async () => {
  const res = await axios.get('https://felicidad-api.herokuapp.com/posts')
  return res.data
})

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    addPost: (state, action) => {
      return { ...state, posts: [...state.posts, action.payload] }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts.reverse()
      state.status = 'fullfilled'
    },
    [fetchPosts.error]: (state, action) => {
      state.error = action.error.message
      state.status = 'error'
    },
  },
})

export const { addPost } = timelineSlice.actions

export default timelineSlice.reducer
