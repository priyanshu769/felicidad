import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [
    {
      _postID: 'p1201',
      caption: 'making my own social media',
      likes: 22,
      user: {
        userID: 'u1234',
        username: 'priyanshu',
      },
    },
    {
      _postID: 'p1202',
      caption: 'i think I can do it',
      likes: 12,
      user: {
        userID: 'u1234',
        username: 'priyanshu',
      },
    },
    {
      _postID: 'p1203',
      caption: 'frontend will be completed by tomorrow',
      likes: 16,
      user: {
        userID: 'u1234',
        username: 'priyanshu',
      },
    },
    {
      _postID: 'p1204',
      caption: 'the hectic part is css, even more than backend',
      likes: 32,
      user: {
        userID: 'u1234',
        username: 'priyanshu',
      },
    },
    {
      _postID: 'p1205',
      caption: "doing the frontend seems hard but it isn't",
      likes: 32,
      user: {
        userID: 'u1234',
        username: 'priyanshu',
      },
    },
  ],
  status: 'idle',
}

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    likeBtnClicked: (state, action) => {
      state.posts.map((post) => {
        if (post._postID === action.payload) {
          return (post.likes += 1)
        }
      })
    },
    addPost: (state, action) => {
      console.log(state)
      console.log(state.posts)
      const newState = {...state, posts: [...state.posts, action.payload]}
      return (newState)
    },
  },
})

export const { likeBtnClicked, addPost } = timelineSlice.actions

export default timelineSlice.reducer
