import { useState, useEffect } from 'react'
import { setToken } from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { getBlogsAsnyc } from './reducer/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogsAsnyc())
  }, [dispatch])

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
      <Notification />
      <LoginForm
      />
      <BlogForm />
    </div>
  )
}

export default App
