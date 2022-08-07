import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FollowerCard, Loading } from '../../components'
import { setToast } from '../toast/toastSlice'

export const Explore = () => {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
    const loggedInUser = useSelector((state) => state.profile.loggedInUser)

    useEffect(() => {
        ; (async () => {
            try {
                const serverResponse = await axios.get(
                    'https://felicidad-api.herokuapp.com/users/all', { headers: { Authorization: loggedInUserToken } }
                )
                if (serverResponse.data.success) {
                    setUsers(serverResponse.data.users.filter(user => user.username !== loggedInUser.username))
                }
            } catch (error) {
                console.log('Server response failed.', error)
            }
        })()
    }, [loggedInUserToken, loggedInUser])

    const followBtnHandler = async (userToFollow) => {
        if (loggedInUser.following.includes(userToFollow._id)) {
            dispatch(setToast({ showToast: true, toastMessage: "Unfollowing User" }))
            try {
                const unfollowUser = await axios.get(
                    `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/unfollow`,
                    { headers: { Authorization: loggedInUserToken } },
                )
                if (unfollowUser.data.success) {
                    dispatch(setToast({ showToast: true, toastMessage: "User unfollowed" }))
                }
            } catch (error) {
                console.log(error)
                dispatch(setToast({ showToast: true, toastMessage: "Unable to unfollow user" }))
            }
        } else {
            dispatch(setToast({ showToast: true, toastMessage: "Following User" }))
            try {
                const followUser = await axios.get(
                    `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/follow`,
                    { headers: { Authorization: loggedInUserToken } },
                )
                if (followUser.data.success) {
                    console.log(followUser)
                    dispatch(setToast({ showToast: true, toastMessage: "Followed User" }))
                }
            } catch (error) {
                console.log(error)
                dispatch(setToast({ showToast: true, toastMessage: "Unable to follow User" }))
            }
        }
    }

    return (
        <div>
            {!users.length > 0 && <Loading />}
            {users.length > 0 && users.map(user => {
                return (<FollowerCard
                    avatarImg={user.profilePic}
                    username={user.username}
                    folowerCardBtnDisplay={
                        loggedInUser.username === user.username
                            ? 'none'
                            : 'block'
                    }
                    btnName={
                        loggedInUser.following.includes(user._id)
                            ? 'Following'
                            : 'Follow'
                    }
                    followerCardBtnClick={() => followBtnHandler(user)}
                />)
            })}
        </div>
    )
}
