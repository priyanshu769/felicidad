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
      return { ...state, posts: [action.payload, ...state.posts] }
    },
    postLikedByUser: (state, action) => {
      const postToLike = state.posts.find(post => post._id === action.payload._id)
      if(postToLike) {
        return {...state, posts: state.posts.map(post => {
          if(post._id === postToLike._id){
            return {...post, likes: action.payload.likes}
          } else return post
        })}
      }
    },
    postDeleted: (state, action) => {
      const newPosts = state.posts.filter(post => post._id !== action.payload)
      return {...state, posts: newPosts}
    }
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

export const { addPost, postLikedByUser, postDeleted } = timelineSlice.actions

export default timelineSlice.reducer
