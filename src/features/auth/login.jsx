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
    if (loginUserObj.username.length > 3 && loginUserObj.password.length > 3) {
      try {
        if (authState.status === 'Logged Out' || 'Error Logging In') {
          dispatch(loginUser(loginUserObj))
          dispatch(setToast({ showToast: true, toastMessage: "Logging In" }))
        }
      } catch(error) {
        dispatch(setToast({ showToast: true, toastMessage: "Unable to Login Up" }))
        console.log(error)
      }
    } else {
      dispatch(setToast({ showToast: true, toastMessage: "Legit Username/Password Required" }))
    }
  }

  return (
    <div>
      <LoginBox
        usernameText={(e) => setUsername(e.target.value)}
        passwordText={(e) => setPassword(e.target.value)}
        loginBtnClick={() =>
          loginHandler({ username: username, password: password })
        }
      />
      <p>
        Don't have an account? <Link to="/signup">Create One</Link>.
      </p>
    </div>
  )
}
