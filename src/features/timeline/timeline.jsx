import { useState } from 'react'
import { Post, NewPost, OptionsList, Loading } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addPost, postLikedByUser, postDeleted } from './timelineSlice'

export const Timeline = () => {
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const timeline = useSelector((state) => state.timeline)
  const [newPostText, setNewPostText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [showAreYouSureBox, setShowAreYouSureBox] = useState(false)
  const dispatch = useDispatch()
  const newPost = () => {
    return {
      caption: newPostText,
      likes: 0,
      user: loggedInUser?._id,
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

  const likeBtnHandler = async (postId) => {
    try {
      const postLiked = await axios.post(
        `https://felicidad-api.herokuapp.com/posts/${postId}/like`,
        {},
      )
      console.log(postLiked)
      if (postLiked.data.success) {
        dispatch(postLikedByUser(postLiked.data.postUpdated))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePostHandler = async (postId) => {
    try {
      const deletePost = await axios.post(
        `https://felicidad-api.herokuapp.com/posts/${postId}/delete`,
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

  return (
    <div>
      {showOptions && <OptionsList
        setShowOptions={() => setShowOptions(showOptions => !showOptions)}
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
              postLikes={post.likes}
              loggedInUserId={loggedInUser?._id}
              postUserId={post.user._id}
              onOptionsBtnClick={() => {
                setPostToDelete(post._id)
                setShowOptions((showOptions) => !showOptions)
              }}
              onLikeBtnClick={() => likeBtnHandler(post._id)}
            />
          )
        })}
    </div>
  )
}
