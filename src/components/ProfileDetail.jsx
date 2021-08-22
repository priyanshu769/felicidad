import './styles/Utility.css'
import './styles/ProfileDetail.css'
import { Link } from 'react-router-dom'

export const ProfileDetail = (props) => {
  return (
    <div className="profileDetailsContainer">
      <div className="profilePicAndName">
        <div className="imgAvataLgContainer">
          <img
            alt="profile"
            className="imgAvatar"
            src={props.avatarImg ? props.avatarImg : "https://bit.ly/3xfZmSW"}
          />
        </div>
        <div className="profileNameAndConnection">
          <p className="username usernameProfile">{props.name}</p>
          <Link to={props.toUserFollowing}>
            <button className="btnSecondary">
              Following {props.followingNumbers}
            </button>
          </Link>
          <br />
          <Link to={props.toUserFollowers}>
            <button className="btnSecondary">
              Followers {props.followersNumbers}
            </button>
          </Link>
        </div>
      </div>
      <p className="profileBio">{props.bio}</p>
    </div>
  )
}
