import React, { useState } from "react"
import { getAll, update, del } from "../services/blogs"

const Blog = ({ blog, setBlogs, user, testHandleView, testHandleLike }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const showWhenVisible = { display: blogVisible ? 'none' : '', border: '2px solid black', marginTop: '10px' }
  const hidenWhenVisible = { display: blogVisible ? '' : 'none', border: '2px solid black', marginTop: '10px' }

  const handleLike = async () => {
    const updateLikes = blog.likes + 1
    await update(blog.id, { updateLikes })
    await getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const handleRemove = async () => {
    const username = user.username
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await del(blog.id, username)
    }
    await getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const hanldeView = () => setBlogVisible(true)

  return <>
    <div style={showWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={testHandleView || hanldeView}>view</button>
    </div>
    <div style={hidenWhenVisible}>
      <p>{blog.title}</p> <button onClick={() => setBlogVisible(false)}>hide</button>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p> <button onClick={testHandleLike || handleLike}>like</button>
      <p>{blog.author}</p>
      <button onClick={handleRemove}>remove</button>
    </div>
  </>
}



export default Blog