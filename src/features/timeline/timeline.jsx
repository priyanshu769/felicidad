import { useState } from 'react'
import { Post, NewPost, OptionsList, Loading } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addPost, postLikedByUser, postDeleted } from './timelineSlice'
import { postBookmarkedByUser } from '../profile/profileSlice'
import { setToast } from '../toast/toastSlice'

export const Timeline = () => {
  const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const timeline = useSelector((state) => state.timeline)
  const [newPostText, setNewPostText] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [showAreYouSureBox, setShowAreYouSureBox] = useState(false)
  const dispatch = useDispatch()

  const newPost = () => {
    return {
      caption: newPostText,
      user: loggedInUser?._id,
    }
  }

  const addPostHandler = async (newPost) => {
    dispatch(setToast({ showToast: true, toastMessage: "Adding post" }))
    try {
      const postAdded = await axios.post(
        'https://felicidad-api.herokuapp.com/posts/',
        newPost,
      )
      console.log(postAdded.data)
      if (postAdded.data.success) {
        dispatch(setToast({ showToast: true, toastMessage: "Post added" }))
        dispatch(addPost(postAdded.data.postAdded))
      } else dispatch(setToast({ showToast: true, toastMessage: "Error occured while posting" }))
    } catch (error) {
      dispatch(setToast({ showToast: true, toastMessage: "Unable to add post" }))
      console.log(error)
    }
  }

  const likeBtnHandler = async (postId, userId) => {
    dispatch(setToast({ showToast: true, toastMessage: "Heart actioned on post." }))
    try {
      const postLiked = await axios.post(
        `https://felicidad-api.herokuapp.com/posts/${postId}/like`,
        { likedByUser: userId },
      )
      if (postLiked.data.success) {
        dispatch(setToast({ showToast: true, toastMessage: postLiked.data.message }))
        dispatch(postLikedByUser({ postId, userId }))
      } else  dispatch(setToast({ showToast: true, toastMessage: "Error occured while liking post." }))
    } catch (error) {
      dispatch(setToast({ showToast: true, toastMessage: "Unable to heart a post" }))
      console.log(error)
    }
  }

  const bookmarkHandler = async (postId) => {
    dispatch(setToast({ showToast: true, toastMessage: "Updating Bookmarks." }))
    try {
      const postBookmarked = await axios.post(
        `https://felicidad-api.herokuapp.com/bookmark/${postId}/`,
        {},
        { headers: { Authorization: loggedInUserToken } })
        if(postBookmarked.data.success){
          dispatch(setToast({ showToast: true, toastMessage: postBookmarked.data.message }))
          dispatch(postBookmarkedByUser({postId}))
        } else  dispatch(setToast({ showToast: true, toastMessage: "Error occured while bookmarking post." }))
    } catch (error) {
      console.log(error)
    }
  }

  const deletePostHandler = async (postId) => {
    dispatch(setToast({ showToast: true, toastMessage: "Deleting post" }))
    try {
      const deletePost = await axios.post(
        `https://felicidad-api.herokuapp.com/posts/${postId}/delete`,
        {},
      )
      if (deletePost.data.success) {
        dispatch(postDeleted(deletePost.data.postDeleted._id))
        setPostToDelete(null)
        setShowAreYouSureBox((showAreYouSureBox) => !showAreYouSureBox)
        setShowMenu(showMenu => !showMenu)
        dispatch(setToast({ showToast: true, toastMessage: "Post Deleted" }))
      }
    } catch (error) {
      dispatch(setToast({ showToast: true, toastMessage: "Unable to delete post" }))
      console.log(error)
    }
  }

  return (
    <div>
      {showMenu && <OptionsList
        onMenuCloseClick={() => {
          setPostToDelete(null)
          setShowOptions(false)
          setShowAreYouSureBox(false)
          setShowMenu(false)
        }}
        showOptions={showOptions}
        onDeleteBtnClick={() => {
          setShowAreYouSureBox((showAreYouSureBox) => !showAreYouSureBox)
          setShowOptions((showOptions) => !showOptions)
        }}
        showAreYouSureBox={showAreYouSureBox}
        onYesDeleteBtnClick={() => deletePostHandler(postToDelete)}
      />}
      {loggedInUser && <NewPost
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={newPostText.length}
        onPostBtnClick={() => {
          addPostHandler(newPost())
          setNewPostText('')
        }}
      />}
      {timeline.status === 'loading' && <Loading />}
      {timeline.status === 'error' && (
        <h2 style={{ color: 'red' }}>Some error occured...</h2>
      )}
      {timeline.status === 'fullfilled' &&
        timeline.posts.map((post) => {
          return (
            <Post
              avatarImg={post.user.profilePic ? post.user.profilePic : null}
              authorName={post.user.username}
              postText={post.caption}
              postLikes={post.likes.length}
              postLiked={post.likes.includes(loggedInUser?._id)}
              loggedInUserId={loggedInUser?._id}
              postUserId={post.user._id}
              onOptionsBtnClick={() => {
                setPostToDelete(post._id)
                setShowOptions((showOptions) => !showOptions)
                setShowMenu(showMenu => !showMenu)
              }}
              onLikeBtnClick={() => likeBtnHandler(post._id, loggedInUser._id)}
              onBookmarkBtnClick={() => bookmarkHandler(post._id, loggedInUser._id)}
              postBookmarked={loggedInUser?.bookmarks?.includes(post._id)}
            />
          )
        })}
    </div>
  )
}
