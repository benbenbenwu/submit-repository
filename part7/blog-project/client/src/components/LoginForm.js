import React from 'react'
import { connect } from 'react-redux'
import { getBlogsAsnyc } from '../reducer/blogsReducer'
import { setUserAsnyc, setUser } from '../reducer/userReducer'
import { useField } from '../hooks'

const LoginForm = ({
  user,
  getBlogsAsnyc,
  setUserAsnyc,
  setUser
}) => {

  const name = useField('username', 'text')
  const pass = useField('password', 'text')

  const handleLogin = async (event) => {
    event.preventDefault()
    setUserAsnyc({
      username: name.value,
      password: pass.value,
    })
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    getBlogsAsnyc()
  }

  return !user
    ? <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...name} />
        </div>
        <div>
          password
          <input {...pass} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
    : <><h2>{user.username} logged in</h2><button onClick={handleLogout}>logout</button></>
}

export default connect(
  state => ({ user: state.user }),
  {
    getBlogsAsnyc,
    setUserAsnyc,
    setUser
  }
)(LoginForm)