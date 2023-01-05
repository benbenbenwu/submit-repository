import { useState, useEffect } from 'react'
import { getAll, setToken } from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [correctMessage, setCorrectMessage] = useState(null)
  const [user, setUser] = useState(null)




  useEffect(() => {
    getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])



  return (
    <div style={{ padding: '0 50px' }}>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} correctMessage={correctMessage} />

      <LoginForm
        user={user}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
        setBlogs={setBlogs}
      />


      <BlogForm
        user={user}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
        setCorrectMessage={setCorrectMessage}
        setBlogs={setBlogs}
        blogs={blogs}
      />

    </div>
  )
}

export default App
