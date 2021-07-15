import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { FollowerCard } from '../../components'
import { addToFollowing, removeFromFollowing } from './profileSlice'


export const Following = () => {
  const { username } = useParams()
  const usersList = useSelector(state => state.auth.usersList)
  const userToDisplay = usersList.find((user) => user.username === username)
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
      {userToDisplay.following.map((followingUser) => {
        return (
          <FollowerCard
            user={followingUser}
            folowerCardBtnDisplay={
              userLoggedIn.username === followingUser ? 'none' : 'block'
            }
            btnName={
              userLoggedIn.following.includes(followingUser)
                ? 'Following'
                : 'Follow'
            }
            followerCardBtnClick={()=> followCardBtnClick(followingUser)}
          />
        )
      })}
    </div>
  )
}
