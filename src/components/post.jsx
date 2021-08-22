import './styles/utility.css'
import './styles/post.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons'

export const Post = (props) => {
  return (
    <div className="postContainer">
      <div className="postAuthorCredentials">
        <div className="imgAvatarSmContainer">
          <img alt="profile" className="imgAvatar" src={props.avatarImg ? props.avatarImg : "https://bit.ly/2Wg4Dg2"} />
        </div>
        <Link className="usernameLink" to={`/${props.authorName}`}>
        <p className="username usernamePost">@{props.authorName}</p>
        </Link>
      </div>
      <div className="post">
        <p className="postText">
          {props.postText}
        </p>
      </div>
      <button onClick={props.onLikeBtnClick} className="btnSecondary">
        <FontAwesomeIcon size="lg" icon={faHeart} outline="1px" color="black" />
        <span className="postLikesNumber"> {props.postLikes}</span>
      </button>
      <button onClick={props.onSHareBtnClick} className="btnSecondary">
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
