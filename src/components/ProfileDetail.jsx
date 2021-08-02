import React from 'react'
import './styles/profile.css'
import { Link } from 'react-router-dom'

export const ProfileDetail = (props) => {
  return (
    <div className="profileDetailsContainer">
      <div className="profilePicAndName">
        <div className="profileImgContainer">
          <img
            alt="profile"
            className="profileImg"
            src="https://bit.ly/3xfZmSW"
          />
        </div>
        <div className="profileNameAndConnection">
          <p className="profileName">{props.name}</p>
          <Link to={props.toUserFollowing}>
            <button className="profileBtn">
              Following {props.followingNumbers}
            </button>
          </Link>
          <br />
          <Link to={props.toUserFollowers}>
            <button className="profileBtn">
              Followers {props.followersNumbers}
            </button>
          </Link>
        </div>
      </div>
      <div></div>
      <p className="profileBio">{props.bio}</p>
    </div>
  )
}
