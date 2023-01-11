import { Routes, Route } from "react-router-dom"
import { useEffect } from 'react'
import { setToken } from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { getBlogsAsnyc } from './reducer/blogsReducer'
import { setUser } from './reducer/userReducer'
import Menu from "./components/Menu"
import ShowAddedBlog from "./components/ShowAddedBlog"
import ShowBlogDetail from "./components/ShowBlogDetail"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogsAsnyc())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setToken(user.token)
    }
  }, [dispatch])



  return (
    <div style={{ padding: '0 50px' }}>
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<BlogForm />} />
        <Route path="/users" element={<LoginForm />} />
        <Route path='/users/:id' element={<ShowAddedBlog />} />
        <Route path='/blogs/:id' element={<ShowBlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
