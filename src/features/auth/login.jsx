import { LoginBox } from '../../components/index'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoggedIn, setLoggedInUser } from './authSlice'
import { setUser } from '../profile/profileSlice'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayMsg, setDisplayMsg] = useState('')
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.auth.usersList)
  const userLogin = (username, password) => {
    const findUserFromUsersList = usersList.find(
      (user) => user.username === username,
    )
    if (findUserFromUsersList) {
      if (findUserFromUsersList.password === password) {
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
        setDisplayMsg('')
        localStorage.setItem(
          'loggedInSM',
          JSON.stringify({
            loggedInStatus: true,
            loggedInUser: {
              username: findUserFromUsersList.username,
              userID: findUserFromUsersList.userID,
            },
          }),
        )
      } else setDisplayMsg('Username or Password is incorrect.')
    } else setDisplayMsg('Username or Password is incorrect.')
  }
  return (
    <div>
      <LoginBox
        usernameText={(e) => setUsername(e.target.value)}
        passwordText={(e) => setPassword(e.target.value)}
        loginBtnClick={() => userLogin(username, password)}
      />
      <p>{displayMsg}</p>
      <p>
        Don't have an account? <Link to="/signup">Create One</Link>.
      </p>
    </div>
  )
}
