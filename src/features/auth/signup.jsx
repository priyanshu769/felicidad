import { SignupBox } from '../../components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from './authSlice'
import { setToast } from '../toast/toastSlice'

export const Signup = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const signupHandler = async () => {    
    if (password === rePassword) {
      try {
        if (authState.status === 'Logged Out' || 'Error Logging In') {
          dispatch(setToast({ showToast: true, toastMessage: "Signing Up" }))
          dispatch(
            signupUser({
              username: username,
              password: password,
              name: name,
              email: email,
            }),
            )
          }
        } catch (error) {
        dispatch(setToast({ showToast: true, toastMessage: "Unable to Sign Up" }))
        console.log(error)
      }
    } else setDisplayMessage('Passwords does not match!')
  }
  return (
    <div>
      {displayMessage && <h3>{displayMessage}</h3>}
      <SignupBox
        signupName={(e) => setName(e.target.value)}
        signupUsername={(e) => setUsername(e.target.value)}
        signupEmail={(e) => setEmail(e.target.value)}
        signupPassword={(e) => setPassword(e.target.value)}
        signupRePassword={(e) => setRePassword(e.target.value)}
        signupBtnClick={signupHandler}
      />
      <p>
        Already have an account? <Link to="/">Login</Link>.
      </p>
    </div>
  )
}
