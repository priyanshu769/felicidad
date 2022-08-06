import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FollowerCard, Loading } from '../../components'
import { setToast } from '../toast/toastSlice'

export const Followers = () => {
  const { username } = useParams()
  const dispatch = useDispatch()
  const [followers, setFollowers] = useState([])
  const [loading, setLoading] = useState(null)
  const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  
  useEffect(() => {
    ;(async () => {
      try {
        setLoading('loading')
        const followers = await axios.get(
          `https://felicidad-api.herokuapp.com/connection/${username}/followers`,
          { headers: { Authorization: loggedInUserToken } },
        )
        if (followers.data.success) {
          setLoading(null)
          setFollowers(followers.data.followersList)
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
          `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/unfollow`,
          { headers: { Authorization: loggedInUserToken } },
          )
          if(unfollowUser.data.success){
            console.log(unfollowUser)
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
            `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/follow`,
            { headers: { Authorization: loggedInUserToken } },
            )
            if(followUser.data.success){
              console.log(followUser)
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
      {loading === null && followers.length === 0 && <h3>No followers.</h3>}
      {loading === null &&
        followers.length > 0 &&
        followers.map((followerUser) => {
          return (
            <FollowerCard
            avatarImg={followerUser.profilePic}
              username={followerUser.username}
              folowerCardBtnDisplay={
                loggedInUser.username === followerUser.username
                  ? 'none'
                  : 'block'
              }
              btnName={
                loggedInUser.following.includes(followerUser._id)
                  ? 'Following'
                  : 'Follow'
              }
              followerCardBtnClick={() => followBtnHandler(followerUser)}
            />
          )
        })}
    </div>
  )
}
