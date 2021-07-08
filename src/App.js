import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Timeline, Profile, Following, Followers } from './features/index'
import {Login} from "./features/auth/login"

function App() {
  return (
    <div className="App">
    <Login />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/following" element={<Followers />} />
        <Route path="/:username/followers" element={<Following />} />
      </Routes>
    </div>
  )
}

export default App
