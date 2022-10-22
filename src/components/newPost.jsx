import './styles/utility.css'
import './styles/newPost.css'

export const NewPost = (props) => {
  return (
    <div style={{ display: props.displayNewPost }} className="newPost">
      <div className='textareaHolder'>
        <textarea value={props.newPostValue} onChange={props.onChangeTextArea} placeholder="What's happening?" className="newPostText"></textarea>
      </div>
      <div className="newPostActionBtnContainer">
        <p className='totalChars'>{props.totalCharacters}</p>
        <button onClick={props.onPostBtnClick} className="btnPrimary">Post</button>
      </div>
    </div>
  )
}
