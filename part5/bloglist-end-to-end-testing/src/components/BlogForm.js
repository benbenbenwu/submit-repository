import React from 'react'
import { useState } from 'react'
import Blog from './Blog'
import { getAll, create } from '../services/blogs'

const BlogForm = ({
  user,
  setErrorMessage,
  setCorrectMessage,
  setBlogs,
  blogs
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogsVisible, setBlogsVisible] = useState(false)



  const handleBlog = async (event) => {
    event.preventDefault()

    try {

      await create({ title, author, url, username: user.username })
      setTitle('')
      setAuthor('')
      setUrl('')
      getAll().then(blogs =>
        setBlogs(blogs)
      )
      setCorrectMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setCorrectMessage(null)
      }, 3000)
    } catch (error) {
      setErrorMessage('Wrong messages')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
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
          <label htmlFor="title">title</label>
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" id="create-button">create</button>
      </form>
      <button onClick={() => setBlogsVisible(false)}>cancel</button>
    </div>
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
    )}
  </div>
}


export default BlogForm