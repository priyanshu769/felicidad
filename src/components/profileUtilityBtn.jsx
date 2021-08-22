import { Link } from 'react-router-dom'
import './styles/Utility.css'

export const ProfileUtilityBtn = (props) => {
  return (
    <div className="profileUtilityBtnContainer">
      <button
        onClick={props.followBtnClicked}
        style={{ display: props.displayFollow }}
        className="btnPrimary"
      >
        {props.utilityBtnName}
      </button>
      <Link className="navLink" to={props.editBtnClicked}>
        <button
          style={{ display: props.displayEdit }}
          className="btnPrimary"
        >
          Edit Profile
        </button>
      </Link>
    </div>
  )
}
