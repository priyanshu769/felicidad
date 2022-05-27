import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FollowerCard, Loading } from '../../components'

export const Following = () => {
  const { username } = useParams()
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(null)
  const [connectionMsg, setConnectionMsg] = useState(null)
  const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  console.log(connectionMsg)
  useEffect(() => {
    ;(async () => {
      try {
        setLoading('loading')
        const following = await axios.get(
          `https://felicidad-api.herokuapp.com/connection/${username}/following`,
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
    console.log(userToFollow._id)
    if (loggedInUser.following.includes(userToFollow._id)) {
      console.log('following Page follow Btn triggered')
      try {
        const unfollowUser = await axios.get(
          `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/unfollow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        console.log(unfollowUser)
        setConnectionMsg(unfollowUser.message)
      } catch (error) {
        setConnectionMsg(error)
        console.log(error)
      }
    } else {
      console.log('following Page follow Btn triggered')
      try {
        const followUser = await axios.get(
          `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/follow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        console.log(followUser)
        setConnectionMsg(followUser.message)
      } catch (error) {
        setConnectionMsg(error.message)
        console.log(error)
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
