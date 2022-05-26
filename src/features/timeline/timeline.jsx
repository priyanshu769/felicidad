import { useState } from 'react'
import { Post, NewPost } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addPost, postLikedByUser } from './timelineSlice'

export const Timeline = () => {
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const timeline = useSelector((state) => state.timeline)
  const [newPostText, setNewPostText] = useState('')
  const dispatch = useDispatch()

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

  const likeBtnHandler = async (postId) => {
    try{
      const postLiked = await axios.post(`https://felicidad-api.herokuapp.com/posts/${postId}/like`, {})
      console.log(postLiked)
      if(postLiked.data.success) {
        dispatch(postLikedByUser(postLiked.data.postUpdated))
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <NewPost
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={newPostText.length}
        onPostBtnClick={() => {
          addPostHandler(newPost())
          setNewPostText('')
        }}
      />
      {timeline.status === 'loading' && <h2>Loading...</h2>}
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
              onLikeBtnClick={() => likeBtnHandler(post._id)}
            />
          )
        })}
    </div>
  )
}
