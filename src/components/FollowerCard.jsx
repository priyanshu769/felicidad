import React from 'react'
import { Link } from 'react-router-dom'
import './styles/followerCard.css'


export const FollowerCard = (props) => {
  return (
    <div className="followerCredentials">
      <div className="followerImgContainer">
        <img
          alt="profile"
          className="followerImg"
          src="https://bit.ly/3xfZmSW"
        />
      </div>
      <Link to={`/${props.username}`}>
        <h3 className="followerName">{props.username}</h3>
      </Link>
      <div style={{display: props.folowerCardBtnDisplay}}>
        <button
          onClick={props.followerCardBtnClick}
          className="followerCardActionBtn"
        >
          {props.btnName}
        </button>
      </div>
    </div>
  )
}
