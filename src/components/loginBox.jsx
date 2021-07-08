import "./styles/loginBox.css"

export const LoginBox = () => {
  return (
    <div>
      <input className="inputUsername" type="text" placeholder="username" />
      <br />
      <input className="inputPassword" type="password" placeholder="password" />
      <br />
      <button className="loginBtn">Login</button>
    </div>
  )
}
