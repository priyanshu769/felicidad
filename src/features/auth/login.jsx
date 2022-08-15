import { LoginBox } from '../../components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './authSlice'
import { setToast } from '../toast/toastSlice'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)

  const loginHandler = (loginUserObj) => {
    if (loginUserObj.username.length > 3 && loginUserObj.password.length > 6) {
      try {
        if (authState.status === 'Logged Out' || 'Error Logging In') {
          dispatch(loginUser(loginUserObj))
          dispatch(setToast({ showToast: true, toastMessage: "Logging In" }))
        }
      } catch (error) {
        dispatch(setToast({ showToast: true, toastMessage: "Unable to Login" }))
        console.log(error)
      }
    } else {
      dispatch(setToast({ showToast: true, toastMessage: "Legit Username/Password Required" }))
    }
  }

  const guestCredentials = () => {
    setUsername('test')
    setPassword('test123')
  }

  return (
    <div>
      <h1>Log In</h1>
      <LoginBox
        usernameText={(e) => setUsername(e.target.value)}
        passwordText={(e) => setPassword(e.target.value)}
        usernameValue={username}
        passwordValue={password}
        loginBtnClick={() =>
          loginHandler({ username: username, password: password })
        }
        guestBtnClick={() => {
          guestCredentials()
          setTimeout(
            loginHandler({ username: username, password: password }), 2500
          )
        }}
      />
      <p>
        Don't have an account? <Link to="/signup">Create One</Link>.
      </p>
    </div>
  )
}
