import './styles/Utility.css'

export const LoginBox = (props) => {
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
          type="password"
          placeholder="Password"
        />
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
