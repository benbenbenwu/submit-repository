import React from 'react'
import { useState } from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { getBlogsAsnyc, createBlogAsnyc } from '../reducer/blogsReducer'
import { useField } from '../hooks'

const BlogForm = ({
  user,
  getBlogsAsnyc,
  createBlogAsnyc,
  blogs
}) => {


  const [blogsVisible, setBlogsVisible] = useState(false)

  const title = useField('title', 'text')
  const author = useField('author', 'text')
  const url = useField('url', 'text')


  const handleBlog = async (event) => {
    event.preventDefault()
    createBlogAsnyc({
      title: title.value,
      author: author.value,
      url: url.value,
      username: user.username
    })
    getBlogsAsnyc()
  }
  const showWhenVisible = { display: blogsVisible ? '' : 'none' }
  const hideWhenVisible = { display: blogsVisible ? 'none' : '' }

  return <div style={{ marginTop: '50px' }}>
    <div style={hideWhenVisible}>
      <button onClick={() => setBlogsVisible(true)}>new blog</button>
    </div>
    <div style={showWhenVisible}>
      <h2>create new</h2>
      <form onSubmit={handleBlog}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => setBlogsVisible(false)}>cancel</button>
    </div>
    {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog} user={user} />
    )}

  </div>
}

export default connect(
  state => ({
    blogs: state.blogs,
    user: state.user
  }),
  {
    getBlogsAsnyc,
    createBlogAsnyc
  }
)(BlogForm)