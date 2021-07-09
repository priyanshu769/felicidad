import { useParams } from 'react-router'
import { FollowerCard } from '../../components'
import { usersList } from '../auth/login'

export const Followers = () => {
  const { username } = useParams()
  console.log(username)
  const userToDisplay = usersList.find((user) => user.username === username)
  return (
    <div>
      {userToDisplay.followers.map((followerUser) => {
        return <FollowerCard user={followerUser.username} />
      })}
    </div>
  )
}
