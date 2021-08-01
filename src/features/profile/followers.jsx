import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FollowerCard } from '../../components'

export const Followers = () => {
  const { username } = useParams()
  const [followers, setFollowers] = useState([])
  const [loading, setLoading] = useState(null)
  const [connectionMsg, setConnectionMsg] = useState(null)
  const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  console.log(connectionMsg)
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

  const followBtnHandler = async(userToFollow) => {
    console.log(userToFollow)
    if (loggedInUser.following.includes(userToFollow._id)){
      console.log("followers Page follow Btn triggered")
      try{
        const unfollowUser = await axios.get(`https://felicidad-api.herokuapp.com/users/${userToFollow._id}/unfollow`, { headers: { Authorization: loggedInUserToken } })
        console.log(unfollowUser)
        setConnectionMsg(unfollowUser.message) 
      }catch(error){
        setConnectionMsg(error.message) 
        console.log(error)
      }
    } else {
        console.log("followers Page follow Btn triggered")
        try{
          const followUser = await axios.get(`https://felicidad-api.herokuapp.com/users/${userToFollow._id}/follow`, { headers: { Authorization: loggedInUserToken } })
          console.log(followUser)
          setConnectionMsg(followUser.message) 
        }catch(error){
          setConnectionMsg(error.message) 
          console.log(error)
      }
    }
  }

  return (
    <div>
      {loading === 'loading' && <h3>Loading...</h3>}
      {loading === 'error' && (
        <h3 style={{ color: 'red' }}>Some error occured...</h3>
      )}
      {loading === null && followers.length === 0 && <h3>No followers.</h3>}
      {loading === null &&
        followers.length > 0 &&
        followers.map((followerUser) => {
          return (
            <FollowerCard
              username={followerUser.username}
              folowerCardBtnDisplay={
                loggedInUser.username === followerUser.username ? 'none' : 'block'
              }
              btnName={
                loggedInUser.following.includes(followerUser._id)
                  ? 'Following'
                  : 'Follow'
              }
              followerCardBtnClick={()=> followBtnHandler(followerUser)}
            />
          )
        })}
    </div>
  )
}
