import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
  SidebarBtn,
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
  const navigate = useNavigate()
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
      {showToast && <Toast toastMessage={toastMessage} />}
      {loggedInToken && <nav className='nav'>
        <SidebarBtn btnAction={() => navigate('/')} btnName={<BiHomeHeart size={35} />} />
        <SidebarBtn btnAction={() => navigate('/explore')} btnName={<FiCompass size={35} />} />
        <SidebarBtn btnAction={() => navigate('/bookmarks')} btnName={<BsBookmark size={35} />} />
        <SidebarBtn btnAction={() => navigate(`/${loggedInUser?.username}`)} btnName={<FiUser size={35} />} />
        <SidebarBtn btnAction={logoutHandler} btnName={<FiLogOut size={35} />} />
      </nav>}
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
