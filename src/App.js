import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import {
  Timeline,
  Profile,
  Following,
  Followers,
  Signup,
} from './features/index'
import {
  DoublePrivateRoute,
  PrivateRoute,
  ReversePrivateRoute,
} from './components/index'
import { useSelector } from 'react-redux'

function App() {
  const loggedIn = useSelector((state) => {
    return state.auth.loggedIn
  })
  const userLoggedIn = useSelector((state) => {
    return state.auth.loggedInUser?.username
  })
  return (
    <div className="App">
      <div>
        <Link to="/">Home</Link>
        <Link to={`/${userLoggedIn}`}>Profile</Link>
      </div>
      <Routes>
        <DoublePrivateRoute login={loggedIn} element={<Timeline />} path="/" />
        <PrivateRoute
          login={loggedIn}
          element={<Profile />}
          path="/:username"
        />
        <PrivateRoute
          login={loggedIn}
          element={<Followers />}
          path="/:username/followers"
        />
        <PrivateRoute
          login={loggedIn}
          element={<Following />}
          path="/:username/following"
        />
        <ReversePrivateRoute
          login={loggedIn}
          element={<Signup />}
          path="/signup"
        />
        {/*<Route path="/" element={<Timeline />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/following" element={<Followers />} />
        <Route path="/:username/followers" element={<Following />} />
        <Route path="/signup" element={<Signup />} />*/}
      </Routes>
    </div>
  )
}

export default App
