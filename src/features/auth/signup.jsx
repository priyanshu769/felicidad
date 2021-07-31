import { SignupBox } from '../../components/index'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const Signup = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayMessage, setDisplayMessage] = useState("")
  const usersList = useSelector(state => state.auth.usersList)
  const signupBtnClicked = () => {
    usersList.push({
      username: username,
      password: password,
      name: name,
      email: email
    })
    setDisplayMessage("Now you can Login.")
    console.log(usersList)
  }
  return (
    <div>
      <SignupBox
        signupName={(e) => setName(e.target.value)}
        signupUsername={(e) => setUsername(e.target.value)}
        signupEmail={(e)=> setEmail(e.target.value)}
        signupPassword={(e)=> setPassword(e.target.value)}
        signupBtnClick={signupBtnClicked}
      />
      <p>{displayMessage}</p>
      <p>
        Already have an account? <Link to="/">Login</Link>.
      </p>
    </div>
  )
}
