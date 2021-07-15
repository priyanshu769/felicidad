import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

export const EditProfile = () => {
  const { username } = useParams()
  return (
    <div>
      {/*<p>Name: <input  /></p>
        <p>Username: <input /></p>
        <p>Bio: <input /></p>*/}
    </div>
  )
}
