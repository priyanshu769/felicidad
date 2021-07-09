import { useParams } from 'react-router'
import { FollowerCard } from '../../components'
import { usersList } from '../auth/login'

export const Following = () => {
  const { username } = useParams()
  console.log(username)
  const userToDisplay = usersList.find((user) => user.username === username)
  return (
    <div>
      {userToDisplay.following.map((followedUser) => {
        return <FollowerCard user={followedUser.username} />
      })}
    </div>
  )
}
