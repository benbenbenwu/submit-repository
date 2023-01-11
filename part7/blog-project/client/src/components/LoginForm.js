import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUserAsnyc } from '../reducer/userReducer'
import { getAllUserAsync } from '../reducer/userArrayReducer'
import { useField } from '../hooks'
import { Link } from 'react-router-dom'

const LoginForm = ({
  user,
  userArray,
  setUserAsnyc,
  getAllUserAsync
}) => {
  const name = useField('username', 'text')
  const pass = useField('password', 'text')

  useEffect(() => {
    if (user) {
      getAllUserAsync()
    }
  }, [user, getAllUserAsync])

  const handleLogin = async (event) => {
    event.preventDefault()
    setUserAsnyc({
      username: name.value,
      password: pass.value,
    })
  }


  return (
    <div>
      <>
        {!user
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
          : null}
      </>
      <>
        {
          user
            ?
            <>
              <h2>User</h2>
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th>blogs created</th>
                  </tr>
                  {userArray.map((u) => (
                    <tr key={u.id}>
                      <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                      <td>{u.blogs.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
            : null
        }
      </>
    </div>
  )
}

export default connect(
  state => ({
    user: state.user,
    userArray: state.userArray
  }),
  {
    setUserAsnyc,
    getAllUserAsync
  }
)(LoginForm)