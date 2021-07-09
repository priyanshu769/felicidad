import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {
      userID: 'u1234',
      username: 'priyanshu',
      name: 'Priyanshu',
      bio:
        "I’m not always sarcastic. Sometimes, I’m sleeping. I'm so good at sleeping i can do it with my eyes closed!",
      following: [],
      followers: [],
      posts: ['p1201', 'p1202', 'p1203', 'p1204', 'p1205'],
    },
    status: 'idle',
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload }
    },
    updateName: (state, action) => {
      return (state.user.name = action.payload)
    },
  },
})
export const { setUser, updateName } = profileSlice.actions

export default profileSlice.reducer
