import { useEffect, useState } from 'react'
import {
  NewPost,
  ProfileDetail,
  Post,
  ProfileUtilityBtn,
  OptionsList
} from '../../components'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addPost, postDeleted } from '../timeline/timelineSlice'
import { profileUnfollowed, profileFollowed } from './profileSlice'

export const Profile = () => {
  const { username } = useParams()
  const loggedInUserToken = useSelector((state) => state.auth.loggedInToken)
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const [userToShow, setUserToShow] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const [newPostText, setNewPostText] = useState('')
  const [connectionMsg, setConnectionMsg] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [showAreYouSureBox, setShowAreYouSureBox] = useState(false)
  const allPosts = useSelector((state) => state.timeline.posts)
  const dispatch = useDispatch()
  console.log(loggedInUser)
  const newPost = () => {
    return {
      caption: newPostText,
      likes: 0,
      user: loggedInUser?._id
    }
  }

  const addPostHandler = async (newPost) => {
    try {
      const postAdded = await axios.post(
        'https://felicidad-api.herokuapp.com/posts/',
        newPost,
      )
      if (postAdded.data.success) {
        dispatch(addPost(postAdded.data.postAdded))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const followBtnHandler = async (userToFollow) => {
    console.log(userToFollow._id)
    if (loggedInUser.following.includes(userToFollow._id)) {
      console.log('profile Page follow Btn triggered')
      try {
        const unfollowUser = await axios.get(
          `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/unfollow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        console.log(unfollowUser.data)
        if(unfollowUser.data.success) {
          dispatch(profileUnfollowed(userToShow._id))
        }
      } catch (error) {
        setConnectionMsg(error)
        console.log(error)
      }
    } else {
      console.log('profile Page follow Btn triggered')
      try {
        const followUser = await axios.get(
          `https://felicidad-api.herokuapp.com/users/${userToFollow._id}/follow`,
          { headers: { Authorization: loggedInUserToken } },
        )
        console.log(followUser.data)
        if(followUser.data.success) {
          dispatch(profileFollowed(userToShow._id))
        }
      } catch (error) {
        setConnectionMsg(error.message)
        console.log(error)
      }
    }
  }

  const deletePostHandler = async (postId) => {
    try {
      const deletePost = await axios.post(
        `http://felicidad-api.herokuapp.com/posts/${postId}/delete`,
        {},
      )
      if (deletePost.data.success) {
        dispatch(postDeleted(deletePost.data.postDeleted._id))
        setPostToDelete(null)
        setShowAreYouSureBox((showAreYouSureBox) => !showAreYouSureBox)
      }
    } catch (error) {
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
      ;(async () => {
        const user = await axios.get(
          `https://felicidad-api.herokuapp.com/users/u/${username}`,
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
    <div className='profile'>
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
      <OptionsList
        showOptions={showOptions}
        onDeleteBtnClick={() => {
          setShowAreYouSureBox((showAreYouSureBox) => !showAreYouSureBox)
          setShowOptions((showOptions) => !showOptions)
        }}
        onCloseBtnClick={() => {
          setPostToDelete(null)
          setShowOptions((showOptions) => !showOptions)
        }}
        showAreYouSureBox={showAreYouSureBox}
        onYesDeleteBtnClick={() => deletePostHandler(postToDelete)}
        onNoDeleteBtnClick={() => {
          setPostToDelete(null)
          setShowAreYouSureBox((showAreYouSureBox) => !showAreYouSureBox)
        }}
      />
      {userPosts.length === 0
        ? 'Zero posts to show.'
        : userPosts.map((post) => {
            return (
              <Post
                avatarImg={post.user.profilePic ? post.user.profilePic : null}
                authorName={post.user.username}
                postText={post.caption}
                postLikes={post.likes}
                loggedInUserId={loggedInUser?._id}
                postUserId={post.user._id}
                onOptionsBtnClick={() => {
                setPostToDelete(post._id)
                setShowOptions((showOptions) => !showOptions)
              }}
              />
            )
          })}
    </div>
  )
}
