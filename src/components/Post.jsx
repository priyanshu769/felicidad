import './styles/post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons'

export const Post = (props) => {
  return (
    <div className="postContainer">
      <div className="postAuthorCredentials">
        <div className="postAuthorImgContainer">
          <img alt="profile" className="postAuthorImg" src="https://bit.ly/3xfZmSW" />
        </div>
        <h3 className="postAuthorName">{props.authorName}</h3>
      </div>
      <div className="post">
        <p className="postText">
          {props.postText}
        </p>
      </div>
      <button onClick={props.onLikeBtnClick} className="postActionIconBtn">
        <FontAwesomeIcon size="lg" icon={faHeart} outline="1px" color="black" />
        <span className="postLikesNumber">{props.postLikes}</span>
      </button>
      <button onClick={props.onSHareBtnClick} className="postActionIconBtn">
        <FontAwesomeIcon
          size="lg"
          icon={faShareAlt}
          outline="1px"
          color="black"
        />
      </button>
    </div>
  )
}
