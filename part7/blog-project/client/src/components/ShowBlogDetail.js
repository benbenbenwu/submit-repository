import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { update, del } from "../services/blogs"
import Comments from "./Comments"

const ShowBlogDetail = ({ blogs, user }) => {

  const blogId = useParams().id
  const blog = blogs.find(b => b.id === blogId)

  const handleLike = async () => {
    const updateLikes = blog.likes + 1
    await update(blog.id, { updateLikes })
  }

  const handleRemove = async () => {
    const username = user.username
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await del(blog.id, username)
    }
  }

  return (
    <div>
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p> <button onClick={handleLike}>like</button>
      <p>{blog.author}</p>
      <button onClick={handleRemove}>remove</button>
      <Comments blogId={blogId} />
    </div>
  )
}

export default connect(
  state => ({
    blogs: state.blogs,
    user: state.user
  })
)(ShowBlogDetail)