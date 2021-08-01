import { SignupBox } from '../../components/index'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from './authSlice'

export const Signup = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayMessage, setDisplayMessage] = useState("")
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const signupHandler = async() =>{
    try{
      if (authState.status === 'Logged Out' || 'Error Logging In'){
        dispatch(signupUser({
          username: username,
          password: password,
          name: name,
          email: email
        }))
      }
    }catch(error){
      console.log(error)
  }
}
  return (
    <div>
      <SignupBox
        signupName={(e) => setName(e.target.value)}
        signupUsername={(e) => setUsername(e.target.value)}
        signupEmail={(e)=> setEmail(e.target.value)}
        signupPassword={(e)=> setPassword(e.target.value)}
        signupBtnClick={signupHandler}
      />
      <p>{displayMessage}</p>
      <p>
        Already have an account? <Link to="/">Login</Link>.
      </p>
    </div>
  )
}
