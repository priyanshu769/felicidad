import './styles/Utility.css'

export const SignupBox = (props) => {
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
          type="password"
          placeholder="Password"
        />
        <br />
        <button onClick={props.signupBtnClick} className="btnPrimary btnLogin">
          Signup
        </button>
    </div>
  )
}
