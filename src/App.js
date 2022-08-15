import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import {
  Timeline,
  Profile,
  Following,
  Followers,
  Signup,
  EditProfile,
  Explore,
  ExploreUsers,
  Bookmarks
} from './features/index'
import {
  DoublePrivateRoute,
  PageNotFound,
  PrivateRoute,
  ReversePrivateRoute,
  Toast,
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
import { setToast } from './features/toast/toastSlice'
import { BiHomeHeart } from 'react-icons/bi'
import { FiUser, FiLogOut, FiCompass } from 'react-icons/fi'
import { BsBookmark } from 'react-icons/bs'

function App() {
  const { loggedInToken } = useSelector((state) => state.auth)
  const { loggedInUser, status } = useSelector((state) => state.profile)
  const { showToast, toastMessage } = useSelector(state => state.toast)
  const timeline = useSelector((state) => state.timeline)
  const dispatch = useDispatch()

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
    ; (async () => {
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

  useEffect(() => {
    if (showToast) {
      setTimeout(() => dispatch(setToast({ showToast: false, toastMessage: "" })), 4000)
    }
  }, [dispatch, showToast])

  const logoutHandler = () => {
    dispatch(setUser(null))
    dispatch(setProfileStatus('idle'))
    dispatch(setProfileError(null))
    dispatch(setLoggedInToken(null))
    localStorage.removeItem('loggedInToken')
  }

  return (
    <div className="App">
      <div className="navbar" style={{ display: loggedInUser && loggedInToken ? 'block' : 'none' }}>
        <NavLink activeClassName="navLinkActive" className="navLink" to="/"><BiHomeHeart size={35} /></NavLink>
        <NavLink activeClassName="navLinkActive" className="navLink" to="/explore"><FiCompass size={35} /></NavLink>
        <NavLink activeClassName="navLinkActive" className="navLink" to="/bookmarks"><BsBookmark size={35} /></NavLink>
        <NavLink activeClassName="navLinkActive" className="navLink" to={`/${loggedInUser?.username}`}><FiUser size={35} /></NavLink>
        {loggedInToken && <button className="navLink logoutBtn" onClick={logoutHandler}><FiLogOut size={35} /></button>}
      </div>
      {showToast && <Toast toastMessage={toastMessage} />}
      <Routes>
        <DoublePrivateRoute
          login={loggedInToken}
          element={<Timeline />}
          path="/"
        />
        <PrivateRoute
          login={loggedInToken}
          path="/explore"
          element={<Explore />}
        />
        <PrivateRoute
          login={loggedInToken}
          path="/exploreUsers"
          element={<ExploreUsers />}
        />
        <PrivateRoute
          login={loggedInToken}
          path="/:username"
          element={<Profile />}
        />
        <PrivateRoute
          login={loggedInToken}
          path="/bookmarks"
          element={<Bookmarks />}
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
  )
}

export default App
