import './App.css'
import { Routes, Route, Link, useParams } from 'react-router-dom'
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
  toggleLoggedIn,
  setLoggedInUser,
} from './features/auth/authSlice'
import { setUser } from './features/profile/profileSlice'
import { useEffect } from 'react'

function App() {
  const usersList = useSelector(state => state.auth.usersList)
  const loggedIn = useSelector((state) => {
    return state.auth.loggedIn
  })
  const userLoggedIn = useSelector((state) => {
    return state.auth.loggedInUser?.username
  })
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedInFromLocalStorage = JSON.parse(
      localStorage.getItem('loggedInSM'),
    )
    if (loggedInFromLocalStorage?.loggedInStatus) {
      const findUserFromUsersList = usersList.find(
        (user) =>
          user.username === loggedInFromLocalStorage?.loggedInUser.username,
      )
      dispatch(toggleLoggedIn(true))
      dispatch(setLoggedInUser(loggedInFromLocalStorage?.loggedInUser))
      dispatch(
        setUser({
          userID: findUserFromUsersList.userID,
          username: findUserFromUsersList.username,
          name: findUserFromUsersList.name,
          bio: findUserFromUsersList.bio,
          following: findUserFromUsersList.following,
          followers: findUserFromUsersList.followers,
          posts: findUserFromUsersList.posts,
        }),
      )
    }
  }, [])
  return (
    <div className="App">
      <div style={{ display: loggedIn ? 'block' : 'none' }}>
        <Link to="/">Home</Link>
        <Link to={`/${userLoggedIn}`}>Profile</Link>
        <button
          onClick={() => {
            dispatch(toggleLoggedIn(false))
            dispatch(setUser(''))
            dispatch(setLoggedInUser(''))
            localStorage.removeItem('loggedInSM')
          }}
        >
          Logout
        </button>
      </div>
      <Routes>
        <DoublePrivateRoute login={loggedIn} element={<Timeline />} path="/" />
        <Route
          path="/:username"
          element={<Profile />}
        />
        <PrivateRoute
          login={loggedIn}
          path="/:username/followers"
          element={<Followers />}
        />
        <PrivateRoute
          login={loggedIn}
          path="/:username/following"
          element={<Following />}
        />
        <PrivateRoute
          login={loggedIn}
          path="/:username/edit"
          element={<EditProfile />}
        />
        <ReversePrivateRoute
          login={loggedIn}
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
