import React from 'react'
import './styles/sidebarBtn.css'

export const SidebarBtn = (props) => {
  return (
    <button onClick={props.btnAction} className='sidebarBtn'>{props.btnName}</button>
  )
}
