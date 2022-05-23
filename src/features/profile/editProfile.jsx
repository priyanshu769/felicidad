import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchLoggedInUser } from './profileSlice'

export const EditProfile = () => {
  const userLoggedIn = useSelector((state) => state.profile.loggedInUser)
  const userLoggedInToken = useSelector((state) => state.auth.loggedInToken)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [profilePicLink, setProfilePicLink] = useState('')
  const [password, setPassword] = useState('')
  const [savedMessage, setSavedMessage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userLoggedIn) {
      userLoggedIn?.name && setName(userLoggedIn.name)
      userLoggedIn?.username && setUsername(userLoggedIn.username)
      userLoggedIn?.email && setEmail(userLoggedIn.email)
      userLoggedIn?.bio && setBio(userLoggedIn.bio)
      userLoggedIn?.profilePic && setProfilePicLink(userLoggedIn.profilePic)
    }
  }, [userLoggedIn])

  const editedProfile = () => {
    return {
      username: username,
      name: name,
      email: email,
      bio: bio,
      password: password,
      profilePic: profilePicLink
    }
  }

  const saveEditedProfile = async (editedProfile) => {
    try {
      setSavedMessage('Updating Profile...')
      const saveProfile = await axios.post(
        `https://felicidad-api.herokuapp.com/users/${userLoggedIn._id}`,
        editedProfile,
        { headers: { Authorization: userLoggedInToken } },
      )
      if (saveProfile.data.success) {
        setSavedMessage('Profile Updated!')
        dispatch(fetchLoggedInUser(userLoggedInToken))
        navigate(`/${userLoggedIn.username}`)
      }
    } catch (error) {
      setSavedMessage('Some Error Occured...')
      console.log(error)
    }
  }
  return (
    <div>
      {savedMessage && <h3>{savedMessage}</h3>}
      <p>
        <input
        className="inputOne"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        />
        </p>
        <p>
        <input
        className="inputOne"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        />
        </p>
        <p>
        <input
        className="inputOne"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />
        </p>
        <p>
        <input
        className="inputOne"
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        />
        </p>
        <p>
        <input
        className="inputOne"
        type="text"
        value={profilePicLink}
        onChange={(e) => setProfilePicLink(e.target.value)}
        placeholder="Profile Pic Link"
        />
        </p>
        <p>
        <input
        className="inputOne"
        type="password"
        value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          />
      </p>
      <button className="btnPrimary btnLogin" onClick={() => saveEditedProfile(editedProfile())}>Save</button>
      {/*Add a change password route here.*/}
    </div>
  )
}
