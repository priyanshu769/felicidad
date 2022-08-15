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
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const signupHandler = async () => {
    if (name.length > 0) {
    if (username.length > 3 && username.length < 15) {
    if (email.includes('@')) {
    if (password.length > 6) {
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
      } else dispatch(setToast({ showToast: true, toastMessage: "Passwords does not match." }))
    } else dispatch(setToast({ showToast: true, toastMessage: "Password must be more than 6 characters." }))
    } else dispatch(setToast({ showToast: true, toastMessage: "Enter valid email." }))
    } else dispatch(setToast({ showToast: true, toastMessage: "Username must be between 3 to 15 characters." }))
    } else dispatch(setToast({ showToast: true, toastMessage: "Name can't be empty." }))
  }
  return (
    <div>
      <h1>Sign Up</h1>
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
