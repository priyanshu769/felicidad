import { LoginBox } from '../../components/index'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoggedIn, setLoggedInUser } from './authSlice'
import { setUser } from '../profile/profileSlice'

export const usersList = [
  {
    userID: 'u1234',
    username: 'priyanshu',
    password: '123',
    name: 'Priyanshu',
    bio:
      "I’m not always sarcastic. Sometimes, I’m sleeping. I'm so good at sleeping i can do it with my eyes closed!",
    following: [],
    followers: [],
    posts: ['p1201', 'p1202', 'p1203', 'p1204', 'p1205'],
  },
  {
    userID: 'u1235',
    username: 'priyam',
    password: 'idea098',
    name: 'Priyam',
    bio: 'Enthu & milennial',
    following: [],
    followers: [],
    posts: ['p1206', 'p1207'],
  },
  {
    userID: 'u1236',
    username: 'ayush',
    password: 'otaku123',
    name: 'Ayush',
    bio: 'Anime is my concern!',
    following: [],
    followers: [],
    posts: ['p1208', 'p1209'],
  },
]

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const userLogin = (username, password) => {
    const findUserFromUsersList = usersList.find(
      (user) => user.username === username,
    )
    console.log(findUserFromUsersList)
    if (findUserFromUsersList) {
      if (findUserFromUsersList.password === password) {
        console.log('password match')
        dispatch(
          setLoggedInUser({
            username: findUserFromUsersList.username,
            userID: findUserFromUsersList.userID,
          }),
        )
        dispatch(
          setUser({
            userID: findUserFromUsersList.userID,
            username: findUserFromUsersList.username,
            name: findUserFromUsersList.name,
            bio: findUserFromUsersList.bio,
            following: findUserFromUsersList.following,
            followers: findUserFromUsersList.followers,
            posts: findUserFromUsersList.posts,
          }),
        )
        dispatch(toggleLoggedIn(true))
      }
    }
  }
  return (
    <div>
      <LoginBox
        usernameText={(e) => setUsername(e.target.value)}
        passwordText={(e) => setPassword(e.target.value)}
        loginBtnClick={() => userLogin(username, password)}
      />
      <p>
        Don't have an account? <Link to="/signUp">Create One</Link>.
      </p>
    </div>
  )
}
