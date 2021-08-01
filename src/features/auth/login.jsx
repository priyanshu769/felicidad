import { LoginBox } from '../../components/index'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './authSlice'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayMsg, setDisplayMsg] = useState('')
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)

  const loginHandler = (username, password) => {
    if (authState.status === 'Logged Out' || 'Error Logging In') {
      dispatch(loginUser(username, password))
    }
  }

  return (
    <div>
      <LoginBox
        usernameText={(e) => setUsername(e.target.value)}
        passwordText={(e) => setPassword(e.target.value)}
        loginBtnClick={() => loginHandler({ username: username, password: password })}
      />
      <p>{displayMsg}</p>
      <p>
        Don't have an account? <Link to="/signup">Create One</Link>.
      </p>
    </div>
  )
}
