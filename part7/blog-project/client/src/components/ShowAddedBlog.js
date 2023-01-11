
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
const ShowAddedBlog = ({ userArray }) => {

  const userId = useParams().id
  const user = userArray.find(u => u.id === userId)

  return (
    <div>
      <h2>added blogs</h2>
      <ul>
        {
          user.blogs.map(b =>
            <li key={b.id}>{b.title}</li>
          )
        }
      </ul>
    </div>
  )
}

export default connect(
  state => ({ userArray: state.userArray })
)(ShowAddedBlog)