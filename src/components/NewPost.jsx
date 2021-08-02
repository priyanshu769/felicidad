import './styles/newPost.css'

export const NewPost = (props) => {
  return (
    <div style={{ display: props.displayNewPost }} className="newPostName">
      <div>
        <textarea value={props.newPostValue} onChange={props.onChangeTextArea} placeholder="What's happening?" className="newPostText"></textarea>
      </div>
      <div className="newPostActionBtnContainer">
        <p>{props.totalCharacters}</p>
        <button onClick={props.onPostBtnClick} className="newPostBtn">Post</button>
      </div>
    </div>
  )
}
