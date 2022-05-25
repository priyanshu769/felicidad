import { Route, Navigate } from 'react-router-dom'

export const PrivateRoute = ({ path, login, ...props }) => {
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/" />
  )
}
