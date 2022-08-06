import React from 'react'
import './styles/utility.css'
import './styles/optionsList.css'

export const OptionsList = (props) => {
  return (
    <div className='optionsListAndSureBox'>
    <div className='closeOptions' onClick={props.onMenuCloseClick}></div>
      <div
        style={{ display: props.showOptions ? 'block' : 'none' }}
        className="optionsList"
      >
        <div className="optionsBtnContainer">
          <button onClick={props.onDeleteBtnClick} className="btnSecondary">
            Delete
          </button>
          <button onClick={props.onMenuCloseClick} className="btnSecondary">
            Close
          </button>
        </div>
        <br />
        <small className="optionsDetails">More options on the way...</small>
      </div>
      <div style={{ display: props.showAreYouSureBox ? 'block' : 'none' }} className="areYouSureBox">
        <p>Are you sure? You want to delete this post?</p>
        <button onClick={props.onYesDeleteBtnClick} className="btnSecondary">
          Yes
        </button>
        <button onClick={props.onMenuCloseClick} className="btnTertiary">
          No
        </button>
      </div>
    </div>
  )
}
