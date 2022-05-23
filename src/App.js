import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import {
  Timeline,
  Profile,
  Following,
  Followers,
  Signup,
  EditProfile,
} from './features/index'
import {
  DoublePrivateRoute,
  PageNotFound,
  PrivateRoute,
  ReversePrivateRoute,
} from './components/index'
import { useSelector, useDispatch } from 'react-redux'
import {
  setUser,
  fetchLoggedInUser,
  setProfileStatus,
  setProfileError,
} from './features/profile/profileSlice'
import { setLoggedInToken } from './features/auth/authSlice'
import { fetchPosts } from './features/timeline/timelineSlice'
import { useEffect } from 'react'

function App() {
  const { loggedInToken } = useSelector((state) => state.auth)
  const { loggedInUser, status } = useSelector((state) => state.profile)
  const timeline = useSelector((state) => state.timeline)
  const dispatch = useDispatch()
  console.log(loggedInUser)
  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage?.getItem('loggedInToken'),
    )
    const token = dataFromLocalStorage?.token
    if (token) {
      dispatch(setLoggedInToken(token))
    }
  }, [dispatch])

  useEffect(() => {
    ;(async () => {
      if (loggedInToken && status === 'idle') {
        dispatch(fetchLoggedInUser(loggedInToken))
      }
    })()
  }, [dispatch, loggedInToken, status])

  useEffect(() => {
    if (loggedInToken && timeline.status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, timeline.status, loggedInToken])

  const logoutHandler = () => {
    dispatch(setUser(null))
    dispatch(setProfileStatus('idle'))
    dispatch(setProfileError(null))
    localStorage.removeItem('loggedInToken')
    dispatch(setLoggedInToken(null))
  }

  return (
    <div className="App">
    <div>
      <div className="navLinks" style={{ display: loggedInToken ? 'block' : 'none' }}>
        <span><NavLink activeClassName="navLinkActive" className="navLink" to="/">Home</NavLink></span>
        <span><NavLink activeClassName="navLinkActive" className="navLink" to={`/${loggedInUser?.username}`}>Profile</NavLink></span>
        <button className="navLink" onClick={logoutHandler}>Logout</button>
      </div>
      <Routes>
        <DoublePrivateRoute
          login={loggedInToken}
          element={<Timeline />}
          path="/"
        />
        <PrivateRoute
          login={loggedInToken}
          path="/:username"
          element={<Profile />}
        />
        <PrivateRoute
          login={loggedInToken}
          path="/:username/followers"
          element={<Followers />}
        />
        <PrivateRoute
          login={loggedInToken}
          path="/:username/following"
          element={<Following />}
        />
        <PrivateRoute
          login={loggedInToken}
          path="/:username/edit"
          element={<EditProfile />}
        />
        <ReversePrivateRoute
          login={loggedInToken}
          path="/signup"
          element={<Signup />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
