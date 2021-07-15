import { useState } from 'react'
import {
  NewPost,
  ProfileDetail,
  Post,
  ProfileUtilityBtn,
} from '../../components/index'
import { likeBtnClicked, addPost } from '../timeline/timelineSlice'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

export const Profile = () => {
  const { username } = useParams()
  const usersList = useSelector(state => state.auth.usersList)
  const user = useSelector((state) => {
    return state.profile.user
  })
  const posts = useSelector((state) => {
    return state.timeline.posts
  })
  const loggedInUser = useSelector((state) => {
    return state.auth.loggedInUser?.username
  })
  const userToShowFromParam = () => {
    const userToShow = usersList.find((user) => user.username === username)
    return userToShow
  }
  const userProfileToShow = userToShowFromParam()
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
        name={userProfileToShow.name}
        followingNumbers={userProfileToShow.following.length}
        followersNumbers={userProfileToShow.followers.length}
        bio={userProfileToShow.bio}
        toUserFollowing={`/${userProfileToShow.username}/following`}
        toUserFollowers={`/${userProfileToShow.username}/followers`}
      />
      <ProfileUtilityBtn
        displayFollow={username !== loggedInUser ? 'block' : 'none'}
        displayEdit={username === loggedInUser ? 'block' : 'none'}
        // followBtnClicked={}
        editBtnClicked={`/${loggedInUser}/edit`}
      />
      <NewPost
        displayNewPost={username === loggedInUser ? 'block' : 'none'}
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={`${newPostText.length}/240`}
        onPostBtnClick={() => {
          dispatch(addPost(newPost()))
          setNewPostText('')
        }}
      />
      {userProfileToShow.posts.length === 0
        ? 'Zero posts to show.'
        : posts
            .filter((post) => post.user.userID === userProfileToShow.userID)
            .map((post) => {
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
