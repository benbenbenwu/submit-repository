import React from 'react'
import { useState } from 'react'
import { getAll, setToken } from '../services/blogs'
import { login } from '../services/login'

const LoginForm = ({
  user,
  setUser,
  setErrorMessage,
  setBlogs
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    await getAll().then(blogs => {
      setBlogs(blogs)
      setUser(null)
    })
  }

  return !user
    ? <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </>
    : <><h2>{user.name} logged in</h2><button onClick={handleLogout}>logout</button></>
}

export default LoginForm