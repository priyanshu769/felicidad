import { useEffect, useState } from 'react'
import {
  NewPost,
  ProfileDetail,
  Post,
  ProfileUtilityBtn,
} from '../../components/index'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export const Profile = () => {
  const { username } = useParams()
  const loggedInUserToken = useSelector(state => state.auth.loggedInToken)
  const loggedInUser = useSelector(state => state.profile.loggedInUser)
  const [userToShow, setUserToShow] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const [newPostText, setNewPostText] = useState('')
  const allPosts = useSelector(state => state.timeline.posts)
  const dispatch = useDispatch()

  const newPost = {
    caption: newPostText,
    likes: 0,
    user: {
      userId: loggedInUser?.userID,
      username: loggedInUser?.username,
    }
  }

  useEffect(()=> {
    if (username === loggedInUser?.username){
      return setUserToShow(loggedInUser)
    } else {
      (async()=> {
        const user = await axios.get(`https://felicidad-api.herokuapp.com/users/u/${username}`, { headers: { Authorization: loggedInUserToken } })
        setUserToShow(user.data.restUserData)
      })()
      console.log(allPosts)
      const userPosts = allPosts.filter(post => post.user.username === username)
      setUserPosts(userPosts)
    }
  }, [dispatch, loggedInUser, loggedInUserToken, username])
  return (
    <div>
      <ProfileDetail
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
        // followBtnClicked={}
        editBtnClicked={`/${loggedInUser}/edit`}
      />
      <NewPost
        displayNewPost={username === loggedInUser?.username ? 'block' : 'none'}
        newPostValue={newPostText}
        onChangeTextArea={(e) => setNewPostText(e.target.value)}
        totalCharacters={`${newPostText.length}/240`}
        onPostBtnClick={() => {
          // dispatch(addPost(newPost()))
          setNewPostText('')
        }}
      />
      {userPosts.length === 0
        ? 'Zero posts to show.'
        : userPosts.map((post) => {
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
