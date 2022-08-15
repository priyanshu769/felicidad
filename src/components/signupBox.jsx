import './styles/utility.css'
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
        type="email"
        pattern=".+@globex\.com"
        placeholder="Email"
      />
      <br />
      <input
        onChange={props.signupPassword}
        className="inputOne"
        type={showPass ? 'text' : 'password'}
        placeholder="Password"
      />
      <input
        onChange={props.signupRePassword}
        className="inputOne"
        type={showPass ? 'text' : 'password'}
        placeholder="Re-Password"
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
      <button onClick={props.signupBtnClick} className="btnPrimary btnLogin">
        Signup
      </button>
    </div>
  )
}
