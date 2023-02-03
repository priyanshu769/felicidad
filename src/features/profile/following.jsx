import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FollowerCard, Loading } from '../../components'
import { setToast } from '../toast/toastSlice'
import { profileUnfollowed, profileFollowed } from './profileSlice'

export const Following = () => {
  const { username } = useParams()
  const dispatch = useDispatch()
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(null)
  const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  useEffect(() => {
    ;(async () => {
      try {
        setLoading('loading')
        const following = await axios.get(
          `https://felicidad-api.cyclic.app/connection/${username}/following`,
          { headers: { Authorization: loggedInUserToken } },
        )
        if (following.data.success) {
          setLoading(null)
          setFollowing(following.data.followingList)
        }
      } catch (error) {
        setLoading('error')
        console.log(error)
      }
    })()
  }, [loggedInUserToken, username])

  const followBtnHandler = async (userToFollow) => {
    if (loggedInUser.following.includes(userToFollow._id)) {
      dispatch(setToast({showToast: true, toastMessage: "Unfollowing User"}))
      try {
        const unfollowUser = await axios.get(
          `https://felicidad-api.cyclic.app/users/${userToFollow._id}/unfollow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        if(unfollowUser.data.success){
          dispatch(profileUnfollowed(userToFollow._id))
          dispatch(setToast({showToast: true, toastMessage: "User unfollowed"}))
        }
      } catch (error) {
        console.log(error)
        dispatch(setToast({showToast: true, toastMessage: "Unable to unfollow user"}))
      }
    } else {
      dispatch(setToast({showToast: true, toastMessage: "Following User"}))
      try {
        const followUser = await axios.get(
          `https://felicidad-api.cyclic.app/users/${userToFollow._id}/follow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        if(followUser.data.success){
          dispatch(profileFollowed(userToFollow._id))
          dispatch(setToast({showToast: true, toastMessage: "Followed User"}))
        }
      } catch (error) {
        console.log(error)
        dispatch(setToast({showToast: true, toastMessage: "Unable to follow User"}))
      }
    }
  }

  return (
    <div>
      {loading === 'loading' && <Loading />}
      {loading === 'error' && (
        <h3 style={{ color: 'red' }}>Some error occured...</h3>
      )}
      {loading === null && following.length === 0 && <h3>Follows no one.</h3>}
      {loading === null &&
        following.length > 0 &&
        following.map((followingUser) => {
          return (
            <FollowerCard
            avatarImg={followingUser.profilePic}
              username={followingUser.username}
              folowerCardBtnDisplay={
                loggedInUser.username === followingUser.username
                  ? 'none'
                  : 'block'
              }
              btnName={
                loggedInUser.following.includes(followingUser._id)
                  ? 'Following'
                  : 'Follow'
              }
              followerCardBtnClick={() => followBtnHandler(followingUser)}
            />
          )
        })}
    </div>
  )
}
