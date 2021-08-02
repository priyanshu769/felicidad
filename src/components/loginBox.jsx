import './styles/loginSignupBox.css'

export const LoginBox = (props) => {
  return (
    <div>
        <input
          onChange={props.usernameText}
          className="inputBox"
          type="text"
          placeholder="Username"
        />
        <br />
        <input
          onChange={props.passwordText}
          className="inputBox"
          type="password"
          placeholder="Password"
        />
        <br />
        <button
          onClick={props.loginBtnClick}
          className="loginBtn"
          type="submit"
        >
          Login
        </button>
    </div>
  )
}
