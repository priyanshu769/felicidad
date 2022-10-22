import React from 'react'
import { BiHomeHeart } from 'react-icons/bi'
import { BsBookmark } from 'react-icons/bs'
import { FiCompass, FiLogOut, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setLoggedInToken } from '../features/auth/authSlice'
import { setProfileError, setProfileStatus, setUser } from '../features/profile/profileSlice'
import { SidebarBtn } from './sidebarBtn'
import './styles/sidebar.css'

export const SidebarLeft = () => {
    const { loggedInUser } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(setUser(null))
        dispatch(setProfileStatus('idle'))
        dispatch(setProfileError(null))
        dispatch(setLoggedInToken(null))
        localStorage.removeItem('loggedInToken')
    }

    return (
        <div className='sidebar'>
            <h1>Felicidad</h1>
            <ul className='sidebarPills'>
                <li className='sidebarPill'><SidebarBtn btnAction={() => navigate('/')} btnName={<BiHomeHeart size={35} />} btnNameSecond='Home' /></li>
                <li className='sidebarPill'><SidebarBtn btnAction={() => navigate('/explore')} btnName={<FiCompass size={35} />} btnNameSecond='Explore' /></li>
                <li className='sidebarPill'><SidebarBtn btnAction={() => navigate('/bookmarks')} btnName={<BsBookmark size={35} />} btnNameSecond='Bookmarks' /></li>
                <li className='sidebarPill'><SidebarBtn btnAction={() => navigate(`/${loggedInUser?.username}`)} btnName={<FiUser size={35} />} btnNameSecond='Profile' /></li>
                <li className='sidebarPill'><SidebarBtn btnAction={logoutHandler} btnName={<FiLogOut size={35} />} btnNameSecond='Logout' /></li>
            </ul>
        </div>
    )
}
