import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    loggedInUser: "",
    usersList: [
      {
        userID: 'u1234',
        username: 'priyanshu',
        password: '123',
        name: 'Priyanshu',
        bio:
          "I’m not always sarcastic. Sometimes, I’m sleeping. I'm so good at sleeping i can do it with my eyes closed!",
        following: ["priyam"],
        followers: ["ayush", "priyam"],
        posts: ['p1201', 'p1202', 'p1203', 'p1204', 'p1205'],
      },
      {
        userID: 'u1235',
        username: 'priyam',
        password: 'idea098',
        name: 'Priyam',
        bio: 'Enthu & milennial',
        following: ["ayush", "priyanshu"],
        followers: ["ayush", "priyanshu"],
        posts: ['p1206', 'p1207'],
      },
      {
        userID: 'u1236',
        username: 'ayush',
        password: 'otaku123',
        name: 'Ayush',
        bio: 'Anime is my concern!',
        following: ["priyanshu", "priyam"],
        followers: [, "priyam"],
        posts: ['p1208', 'p1209'],
      },
    ]
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
