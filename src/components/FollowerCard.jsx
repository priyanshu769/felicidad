import React from 'react'
import './styles/followerCard.css'

export const FollowerCard = () => {
  return (
    <div className="followerCredentials">
      <div className="followerImgContainer">
        <img alt="profile" className="followerImg" src="https://bit.ly/3xfZmSW" />
      </div>
      <h3 className="followerName">Post's Author Name</h3>
      <div>
        <button className="followerCardActionBtn">Follow</button>
      </div>
    </div>
  )
}
