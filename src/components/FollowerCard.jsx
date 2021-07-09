import React from 'react'
import './styles/followerCard.css'

export const FollowerCard = (props) => {
  return (
    <div className="followerCredentials">
      <div className="followerImgContainer">
        <img alt="profile" className="followerImg" src="https://bit.ly/3xfZmSW" />
      </div>
      <h3 className="followerName">{props.user}</h3>
      <div>
        <button onClick={props.followerCardBtnClick} className="followerCardActionBtn">Follow</button>
      </div>
    </div>
  )
}
