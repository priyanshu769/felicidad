import { SignupBox } from '../../components/index'
import { Link } from 'react-router-dom'

export const Signup = () => {
  return (
    <div>
      <SignupBox />
      <p>
        Already have an account? <Link to="/">Login</Link>.
      </p>
    </div>
  )
}
