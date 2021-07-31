import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
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
import { setUser, fetchLoggedInUser } from './features/profile/profileSlice'
import { setLoggedInToken } from './features/auth/authSlice'
import { fetchPosts } from './features/timeline/timelineSlice'
import { useEffect } from 'react'

function App() {
  const {loggedInToken} = useSelector((state) => state.auth)
  const {loggedInUser, status} = useSelector((state) => state.profile)
  const timeline = useSelector((state) => state.timeline)
  const dispatch = useDispatch()

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage?.getItem('loggedInToken'))
    const token = dataFromLocalStorage?.token
    if (token) {
      console.log("triggered, setLoggedInToken")
      dispatch(setLoggedInToken(token))
    }
  }, [dispatch])
  
  useEffect(()=> {
    (async()=> {
      if (loggedInToken && status === "idle"){
        console.log("triggered, fetchLoggedInUser")
        dispatch(fetchLoggedInUser(loggedInToken))
      }
    })()
  }, [dispatch, loggedInToken])

  useEffect(() => {
      if (loggedInToken && timeline.status === 'idle'){
        console.log("triggered, fetchPosts")
        dispatch(fetchPosts())
      }
  }, [dispatch, timeline.status, loggedInToken])
  
  return (
    <div className="App">
      <div style={{ display: loggedInToken ? 'block' : 'none' }}>
        <Link to="/">Home</Link>
        <Link to={`/${loggedInUser?.username}`}>Profile</Link>
        <button
          onClick={() => {
            dispatch(setUser(null))
            dispatch(setLoggedInToken(null))
            localStorage.removeItem('loggedInToken')
          }}
        >
          Logout
        </button>
      </div>
      <Routes>
        <DoublePrivateRoute login={loggedInToken} element={<Timeline />} path="/" />
        <Route
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
