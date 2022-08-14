import './styles/utility.css'
import './styles/post.css'
import { Link } from 'react-router-dom'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { BsThreeDots, BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'

export const Post = (props) => {
  return (
    <div className="postContainer">
      <div className="postAuthorCredentials">
        <div className="imgAvatarSmContainer">
          <img
            alt="profile"
            className="imgAvatar"
            src={props.avatarImg ? props.avatarImg : 'https://bit.ly/2Wg4Dg2'}
          />
        </div>
        <Link className="usernameLink" to={`/${props.authorName}`}>
          <p className="username usernamePost">@{props.authorName}</p>
        </Link>
        <button
          onClick={props.onOptionsBtnClick}
          style={{ display: props.loggedInUserId === props.postUserId ? "block" : "none" }}
          className="btnSecondary showOptionsBtn"
        >
          <BsThreeDots size={25} />
        </button>
      </div>
      <div className="post">
        <p className="postText">{props.postText}</p>
      </div>
      <button onClick={props.onLikeBtnClick} className="btnSecondary">
        {props.postLikes > 0 ? <FcLike size={25} /> : <FcLikePlaceholder size={25} />}
        <span className="postLikesNumber"> {props.postLikes}</span>
      </button>
      <button onClick={props.onBookmarkBtnClick} className="btnSecondary">
        {props.postBookmarked ? <BsFillBookmarkFill size={20} /> : <BsBookmark size={20} />}
      </button>
    </div>
  )
}
