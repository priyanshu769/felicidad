import { useState } from 'react'
import { Post, NewPost } from '../../components/index'
import { likeBtnClicked, addPost } from './timelineSlice'
import { useSelector, useDispatch } from 'react-redux'

export const Timeline = () => {
  const posts = useSelector((state) => {
    console.log(state)
    return state.timeline.posts
  })
  console.log(posts)
  const user = useSelector((state) => {
    console.log(state)
    return state.profile.user
  })
  const dispatch = useDispatch()
  const [newPostText, setNewPostText] = useState('')

  const newPost = () => {
    return {
      _postID: 'p01206',
      caption: newPostText,
      likes: 0,
      user: {
        userID: user.userID,
        username: user.username,
      },
    }
  }

  console.log(newPost())

  return (
    <div>
      <NewPost
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={`${newPostText.length}/240`}
        onPostBtnClick={() => {
          dispatch(addPost(newPost()))
          setNewPostText('')
        }}
      />
      {posts.map((post) => {
        return (
          <Post
            authorName={post.user.username}
            postText={post.caption}
            postLikes={post.likes}
            onLikeBtnClick={() => dispatch(likeBtnClicked(post._postID))}
          />
        )
      })}
    </div>
  )
}
