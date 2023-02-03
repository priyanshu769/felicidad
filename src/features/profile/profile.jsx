import { useEffect, useState } from 'react'
import {
  NewPost,
  ProfileDetail,
  Post,
  ProfileUtilityBtn,
  OptionsList,
  Loading
} from '../../components'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addPost, postLikedByUser, postDeleted } from '../timeline/timelineSlice'
import { profileUnfollowed, profileFollowed, postBookmarkedByUser } from './profileSlice'
import { setToast } from '../toast/toastSlice'

export const Profile = () => {
  const { username } = useParams()
  const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const [userToShow, setUserToShow] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [newPostText, setNewPostText] = useState('')
  const [connectionMsg, setConnectionMsg] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [showAreYouSureBox, setShowAreYouSureBox] = useState(false)
  const allPosts = useSelector((state) => state.timeline.posts)
  const dispatch = useDispatch()
  const newPost = () => {
    return {
      caption: newPostText,
      user: loggedInUser?._id
    }
  }

  const addPostHandler = async (newPost) => {
    dispatch(setToast({ showToast: true, toastMessage: "Adding post" }))
    try {
      const postAdded = await axios.post(
        'https://felicidad-api.cyclic.app/posts/',
        newPost,
      )
      if (postAdded.data.success) {
        dispatch(addPost(postAdded.data.postAdded))
        dispatch(setToast({ showToast: true, toastMessage: "Post added" }))
      } else dispatch(setToast({ showToast: true, toastMessage: "Error occured while posting" }))
    } catch (error) {
      console.log(error)
      dispatch(setToast({ showToast: true, toastMessage: "Unable to add post" }))
    }
  }

  const followBtnHandler = async (userToFollow) => {
    if (loggedInUser.following.includes(userToFollow._id)) {
      dispatch(setToast({ showToast: true, toastMessage: "Unfollowing User" }))
      try {
        const unfollowUser = await axios.get(
          `https://felicidad-api.cyclic.app/users/${userToFollow._id}/unfollow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        console.log(unfollowUser.data)
        if (unfollowUser.data.success) {
          dispatch(profileUnfollowed(userToShow._id))
          dispatch(setToast({ showToast: true, toastMessage: "User unfollowed" }))
        }
      } catch (error) {
        setConnectionMsg(error)
        console.log(error)
        dispatch(setToast({ showToast: true, toastMessage: "Unable to unfollow user" }))
      }
    } else {
      dispatch(setToast({ showToast: true, toastMessage: "Following User" }))
      try {
        const followUser = await axios.get(
          `https://felicidad-api.cyclic.app/users/${userToFollow._id}/follow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        console.log(followUser.data)
        if (followUser.data.success) {
          dispatch(profileFollowed(userToShow._id))
          dispatch(setToast({ showToast: true, toastMessage: "User followed" }))
        }
      } catch (error) {
        setConnectionMsg(error.message)
        console.log(error)
        dispatch(setToast({ showToast: true, toastMessage: "Unable to follow user" }))
      }
    }
  }

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
        `https://felicidad-api.cyclic.app/bookmark/${postId}/`,
        {},
        { headers: { Authorization: loggedInUserToken } })
      if (postBookmarked.data.success) {
        dispatch(setToast({ showToast: true, toastMessage: postBookmarked.data.message }))
        dispatch(postBookmarkedByUser({ postId }))
      } else  dispatch(setToast({ showToast: true, toastMessage: "Error occured while bookmarking post." }))
    } catch (error) {
      console.log(error)
    }
  }

  const deletePostHandler = async (postId) => {
    dispatch(setToast({ showToast: true, toastMessage: "Deleting post" }))
    try {
      const deletePost = await axios.post(
        `https://felicidad-api.cyclic.app/posts/${postId}/delete`,
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

  useEffect(() => {
    if (username === loggedInUser?.username) {
      const userPosts = allPosts.filter(
        (post) => post.user.username === username,
      )
      setUserPosts(userPosts)
      return setUserToShow(loggedInUser)
    } else {
      ; (async () => {
        const user = await axios.get(
          `https://felicidad-api.cyclic.app/users/u/${username}`,
          { headers: { Authorization: loggedInUserToken } },
        )
        setUserToShow(user.data.restUserData)
        const userPosts = allPosts.filter(
          (post) => post.user.username === username,
        )
        setUserPosts(userPosts)
      })()
    }
  }, [dispatch, loggedInUser, loggedInUserToken, username, allPosts])

  return (
    <div>
      {!userToShow && <Loading />}
      {userToShow && <div className='profile'>
        {connectionMsg && <h3>{connectionMsg}</h3>}
        <ProfileDetail
          avatarImg={userToShow.profilePic ? userToShow.profilePic : null}
          name={userToShow?.name}
          followingNumbers={userToShow?.following?.length}
          followersNumbers={userToShow?.followers?.length}
          bio={userToShow?.bio}
          toUserFollowing={`/${userToShow?.username}/following`}
          toUserFollowers={`/${userToShow?.username}/followers`}
        />
        <ProfileUtilityBtn
          displayFollow={username !== loggedInUser?.username ? 'block' : 'none'}
          displayEdit={username === loggedInUser?.username ? 'block' : 'none'}
          utilityBtnName={
            loggedInUser.following.includes(userToShow._id)
              ? 'Following'
              : 'Follow'
          }
          followBtnClicked={() => followBtnHandler(userToShow)}
          editBtnClicked={`/${loggedInUser?.username}/edit`}
        />
        <NewPost
          displayNewPost={username === loggedInUser?.username ? 'block' : 'none'}
          newPostValue={newPostText}
          onChangeTextArea={(e) => setNewPostText(e.target.value)}
          totalCharacters={newPostText.length}
          onPostBtnClick={() => {
            addPostHandler(newPost())
            setNewPostText('')
          }}
        />
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
        {userPosts.length === 0
          ? 'Zero posts to show.'
          : userPosts.map((post) => {
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
      </div>}
    </div>
  )
}
