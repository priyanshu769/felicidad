import { Link } from 'react-router-dom'
import './styles/profileUtilityBtn.css'

export const ProfileUtilityBtn = (props) => {
  return (
    <div className="profileUtilityBtnContainer">
      <button
        onClick={props.followBtnClicked}
        style={{ display: props.displayFollow }}
        className="profileUtilityBtn"
      >
        {props.utilityBtnName}
      </button>
      <Link className="navLink" to={props.editBtnClicked}>
        <button
          style={{ display: props.displayEdit }}
          className="profileUtilityBtn"
        >
          Edit Profile
        </button>
      </Link>
    </div>
  )
}
