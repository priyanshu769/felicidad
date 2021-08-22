import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Utility.css'
import './styles/FollowerCard.css'

export const FollowerCard = (props) => {
  return (
    <div className="followerCredentials">
      <div className="imgAvatarSmContainer">
        <img
          alt="profile"
          className="imgAvatar"
          src="https://bit.ly/3xfZmSW"
        />
      </div>
      <Link className="usernameLink" to={`/${props.username}`}>
        <p className="username">@{props.username}</p>
      </Link>
      <div style={{ display: props.folowerCardBtnDisplay }}>
        <button
          onClick={props.followerCardBtnClick}
          className="btnTertiary btnFollowerCard"
        >
          {props.btnName}
        </button>
      </div>
    </div>
  )
}
