import { useState } from 'react'
import { NewPost, ProfileDetail, Post } from '../../components/index'
import { likeBtnClicked, addPost } from '../timeline/timelineSlice'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

export const Profile = () => {
  const { username } = useParams()
  console.log(username)
  const user = useSelector((state) => {
    return state.profile.user
  })
  const posts = useSelector((state) => {
    return state.timeline.posts
  })
  console.log(posts.filter((post) => post.user.userID === user.userID))
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

  return (
    <div>
      <ProfileDetail
        name={user.username}
        following={user.following.length}
        followers={user.followers.length}
        bio={user.bio}
        toUserFollowing={`/${user.username}/following`}
        toUserFollowers={`/${user.username}/followers`}
      />
      <NewPost
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={`${newPostText.length}/240`}
        onPostBtnClick={() => {
          dispatch(addPost(newPost()))
          setNewPostText('')
        }}
      />
      {user.posts.length === 0
        ? 'Publish your first post.'
        : posts
            .filter((post) => post.user.userID === user.userID)
            .map((post) => {
              return (
                <Post
                  authorName={post.user.name}
                  postText={post.caption}
                  postLikes={post.likes}
                  onLikeBtnClick={() => dispatch(likeBtnClicked(post._postID))}
                />
              )
            })}
    </div>
  )
}
