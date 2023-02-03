import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../../components'
import { postLikedByUser } from '../timeline/timelineSlice'
import { setToast } from '../toast/toastSlice'
import { postBookmarkedByUser } from '../profile/profileSlice'
import { Link } from 'react-router-dom'

export const Explore = () => {
    const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
    const loggedInUser = useSelector((state) => state.profile.loggedInUser)
    const allPosts = useSelector((state) => state.timeline.posts)
    const dispatch = useDispatch()
    const [explorePosts, setExplorePosts] = useState([])
    useEffect(() => {
        const explorePosts = allPosts.filter(
            (post) => post.user._id !== loggedInUser._id)
        setExplorePosts(explorePosts)
    }, [allPosts, loggedInUser])

    const likeBtnHandler = async (postId, userId) => {
        dispatch(setToast({ showToast: true, toastMessage: "Heart actioned on post." }))
        try {
            const postLiked = await axios.post(
                `https://felicidad-api.cyclic.app/posts/${postId}/like`,
                { likedByUser: userId },
            )
            if (postLiked.data.success) {
                dispatch(setToast({ showToast: true, toastMessage: postLiked.data.message }))
                dispatch(postLikedByUser({ postId, userId }))
            }
        } catch (error) {
            dispatch(setToast({ showToast: true, toastMessage: "Unable to heart a post" }))
            console.log(error)
        }
    }

    const bookmarkHandler = async (postId) => {
        dispatch(setToast({ showToast: true, toastMessage: "Updating Bookmarks." }))
        try {
            const postBookmarked = await axios.post(
                `https://felicidad-api.cyclic.app/bookmark/${postId}/`,
                {},
                { headers: { Authorization: loggedInUserToken } })
            if (postBookmarked.data.success) {
                dispatch(setToast({ showToast: true, toastMessage: postBookmarked.data.message }))
                dispatch(postBookmarkedByUser({ postId }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className='exploreUsers'>Explore <Link to='/exploreUSers'>Users</Link></h2>
            <hr />
            {explorePosts.length === 0
                ? 'Zero posts to show.'
                : explorePosts.map((post) => {
                    return (
                        <Post
                            avatarImg={post.user.profilePic ? post.user.profilePic : null}
                            authorName={post.user.username}
                            postText={post.caption}
                            postLikes={post.likes.length}
                            postLiked={post.likes.includes(loggedInUser?._id)}
                            loggedInUserId={'hide'}
                            onLikeBtnClick={() => likeBtnHandler(post._id, loggedInUser._id)}
                            onBookmarkBtnClick={() => bookmarkHandler(post._id, loggedInUser._id)}
                            postBookmarked={loggedInUser?.bookmarks?.includes(post._id)}
                        />
                    )
                })}
        </div>
    )
}
