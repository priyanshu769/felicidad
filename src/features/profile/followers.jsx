import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { FollowerCard } from '../../components'
import { addToFollowing, removeFromFollowing } from './profileSlice'


export const Followers = () => {
  const { username } = useParams()
  const userToDisplay = usersList.find((user) => user.username === username)
  const usersList = useSelector(state => state.auth.usersList)
  const userLoggedIn = useSelector((state) => state.profile.user)
  const dispatch = useDispatch()

  const followBtnFunction = (userToFollow) => {
    dispatch(addToFollowing(userToFollow))
  }

  const followingBtnFunction = (userToUnfollow) => {
    dispatch(removeFromFollowing(userToUnfollow))
  }

  const followCardBtnClick = (followerUser) => {
    if (userLoggedIn.following.includes(followerUser)){
      followingBtnFunction(followerUser)
    } else followBtnFunction(followerUser)
  }

  return (
    <div>
      {userToDisplay.followers.map((followerUser) => {
        return (
          <FollowerCard
            user={followerUser}
            folowerCardBtnDisplay={
              userLoggedIn.username === followerUser ? 'none' : 'block'
            }
            btnName={
              userLoggedIn.following.includes(followerUser)
                ? 'Following'
                : 'Follow'
            }
            followerCardBtnClick={()=> followCardBtnClick(followerUser)}
          />
        )
      })}
    </div>
  )
}
