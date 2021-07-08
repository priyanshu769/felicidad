import React from 'react'
import './styles/profile.css'
import { Link } from 'react-router-dom'

export const ProfileDetail = (props) => {
  return (
    <div className="profileDetailsContainer">
      <div className="profileImgContainer">
        <img alt="profile" className="profileImg" src="https://bit.ly/3xfZmSW" />
        {/* <button className="editProfileImg">Edit Profile</button> */}
      </div>
      <div>
        <p className="profileName">{props.name}</p>
      </div>
      <div>
        <Link to={props.toUserFollowing}>
          <button className="profileBtn">Following {props.following}</button>
        </Link>
        <Link to={props.toUserFollowers}>
          <button className="profileBtn">Followers {props.followers}</button>
        </Link>
      </div>
      <p className="profileBio">{props.bio}</p>
    </div>
  )
}
