import './styles/utility.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const SignupBox = (props) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <div>
      <input
        onChange={props.signupName}
        className="inputOne"
        type="text"
        placeholder="Name"
      />
      <br />
      <input
        onChange={props.signupUsername}
        className="inputOne"
        type="text"
        placeholder="Username"
      />
      <br />
      <input
        onChange={props.signupEmail}
        className="inputOne"
        type="text"
        placeholder="Email"
      />
      <br />
      <input
        onChange={props.signupPassword}
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
      <button onClick={props.signupBtnClick} className="btnPrimary btnLogin">
        Signup
      </button>
    </div>
  )
}
