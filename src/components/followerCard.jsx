import React from 'react'
import { Link } from 'react-router-dom'
import './styles/utility.css'
import './styles/followerCard.css'

export const FollowerCard = (props) => {
  return (
    <div className="followerCard">
    <div className='userNameImageHolder'>
      <div className="imgAvatarSmContainer">
        <img
          alt="profile"
          className="imgAvatar"
          src={props.avatarImg ? props.avatarImg : "https://bit.ly/2Wg4Dg2"}
        />
      </div>
        <Link className="usernameLink" to={`/${props.username}`}>
          <p className="username">@{props.username}</p>
        </Link>
      </div>
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
