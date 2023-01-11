import { useState } from "react"
import { connect } from "react-redux"
import { setComments } from "../reducer/commentsReducer"
import { v1 as uuid } from 'uuid'

const Comments = ({ blogId, commentArray, setComments }) => {
  const [comment, setComment] = useState('')

  const handleComment = async e => {
    e.preventDefault()
    const id = uuid()
    setComments({ id, blogId, comment })
    setComment('')
  }

  const comments = commentArray.filter(c => c.blogId === blogId)

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {
          comments.map(c =>
            <li key={c.id}>{c.comment}</li>
          )
        }
      </ul>
    </div>
  )
}

export default connect(
  state => ({ commentArray: state.comments }),
  {
    setComments
  }
)(Comments)