import './styles/loginSignupBox.css'

export const SignupBox = (props) => {
  return (
    <div>
        <input
          onChange={props.signupName}
          className="inputBox"
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          onChange={props.signupUsername}
          className="inputBox"
          type="text"
          placeholder="Username"
        />
        <br />
        <input
          onChange={props.signupEmail}
          className="inputBox"
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          onChange={props.signupPassword}
          className="inputBox"
          type="password"
          placeholder="Password"
        />
        <br />
        <button onClick={props.signupBtnClick} className="loginBtn">
          Signup
        </button>
    </div>
  )
}
