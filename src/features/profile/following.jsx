import { useParams } from 'react-router'
import { FollowerCard } from '../../components'

export const Following = () => {
  const { username } = useParams()
  console.log(username)
  return (
    <div>
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
    </div>
  )
}
