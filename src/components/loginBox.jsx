import './styles/loginSignupBox.css'

export const LoginBox = (props) => {
  return (
    <div>
        <input
          onChange={props.usernameText}
          className="inputUsername"
          type="text"
          placeholder="username"
        />
        <br />
        <input
          onChange={props.passwordText}
          className="inputPassword"
          type="text"
          placeholder="password"
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
