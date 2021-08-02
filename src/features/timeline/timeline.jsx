import { useState } from 'react'
import { Post, NewPost } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addPost } from './timelineSlice'

export const Timeline = () => {
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const timeline = useSelector((state) => state.timeline)
  const [newPostText, setNewPostText] = useState('')
  const dispatch = useDispatch()

  const newPost = () => {
    return {
      caption: newPostText,
      likes: 0,
      user: {
        userId: loggedInUser?._id,
        username: loggedInUser.username,
      },
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

  return (
    <div>
      <NewPost
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={`${newPostText.length}/240`}
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
              authorName={post.user.username}
              postText={post.caption}
              postLikes={post.likes}
              // onLikeBtnClick={() => dispatch(likeBtnClicked(post._postID))}
            />
          )
        })}
    </div>
  )
}
