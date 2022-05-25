import './styles/utility.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const LoginBox = (props) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <div>
      <input
        onChange={props.usernameText}
        className="inputOne"
        type="text"
        placeholder="Username"
      />
      <br />
      <input
        onChange={props.passwordText}
        className="inputOne"
        type={showPass ? 'text' : 'password'}
        placeholder="Password"
      />
      <div className='showPasswordContainer'>
      <input 
      onChange={()=> setShowPass(showPass => !showPass)}
      checked={showPass}
      type='checkbox' />
      <label>Show Password</label>
      </div>
      <br />
      <button
        onClick={props.loginBtnClick}
        className="btnPrimary btnLogin"
        type="submit"
      >
        Login
      </button>
    </div>
  )
}
