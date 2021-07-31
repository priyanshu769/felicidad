import { useEffect, useState } from 'react'
import { Post, NewPost } from '../../components/index'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { fetchPosts } from './timelineSlice'
import { setUser } from '../profile/profileSlice'

export const Timeline = () => {
  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const timeline = useSelector((state) => state.timeline)
  const dispatch = useDispatch()
  const [newPostText, setNewPostText] = useState('')

  const newPost = () => {
    return {caption: newPostText,
    likes: 0,
    user: {
      userId: loggedInUser?._id,
      username: loggedInUser.username,
    }}
  }

  return (
    <div>
      <NewPost
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={`${newPostText.length}/240`}
        onPostBtnClick={() => {
        {/*dispatch(addPost(newPost()))*/}
          setNewPostText('')
        }}
      />
      {timeline.status==="loading" && <h2>Loading...</h2>}
      {timeline.status==="error" && <h2 style={{color: "red"}}>Some error occured...</h2>}
      {timeline.status==="fullfilled" && timeline.posts.map((post) => {
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
