import './styles/Utility.css'
import './styles/NewPost.css'

export const NewPost = (props) => {
  return (
    <div style={{ display: props.displayNewPost }} className="newPost">
      <div>
        <textarea value={props.newPostValue} onChange={props.onChangeTextArea} placeholder="What's happening?" className="newPostText"></textarea>
      </div>
      <div className="newPostActionBtnContainer">
        <p>{props.totalCharacters}</p>
        <button onClick={props.onPostBtnClick} className="btnSecondary">Post</button>
      </div>
    </div>
  )
}
