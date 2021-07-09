import './styles/loginSignupBox.css'

export const SignupBox = () => {
  return (
    <div>
      <input className="inputBox" type="text" placeholder="Name" />
      <br />
      <input className="inputBox" type="text" placeholder="username" />
      <br />
      <input className="inputBox" type="text" placeholder="email" />
      <br />
      <input className="inputBox" type="password" placeholder="password" />
      <br />
      <button className="loginBtn">Login</button>
    </div>
  )
}
