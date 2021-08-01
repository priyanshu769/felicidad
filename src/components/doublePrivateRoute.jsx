import { Route } from 'react-router-dom'
import { Login } from '../features'

export const DoublePrivateRoute = ({ path, login, ...props }) => {
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Route {...props} path="/" element={<Login />} />
  )
}
