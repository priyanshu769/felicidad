import './styles/utility.css'
import { useState } from 'react'

export const LoginBox = (props) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <div>
      <input
        onChange={props.usernameText}
        className="inputOne"
        type="text"
        value={props.usernameValue}
        placeholder="Username"
      />
      <br />
      <input
        onChange={props.passwordText}
        className="inputOne"
        type={showPass ? 'text' : 'password'}
        value={props.passwordValue}
        placeholder="Password"
      />
      <div className='showPasswordContainer'>
        <label className='showPassCheck'>
          <input
            onChange={() => setShowPass(showPass => !showPass)}
            checked={showPass}
            type='checkbox' />
          Show Password</label>
      </div>
      <br />
      <button
        onClick={props.loginBtnClick}
        className="btnPrimary btnLogin"
        type="submit"
      >
        Login
      </button>
      <button
        onClick={props.guestBtnClick}
        className="btnPrimary btnLogin"
        type="submit"
      >
        Guest Login
      </button>
    </div>
  )
}
