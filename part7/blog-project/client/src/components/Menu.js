import { Link } from 'react-router-dom'
import { getBlogsAsnyc } from '../reducer/blogsReducer'
import { setUser } from '../reducer/userReducer'
import { connect } from 'react-redux'

const Menu = ({ user }) => {

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    getBlogsAsnyc()
  }


  return (
    <div>
      <Link to='/' >blogs</Link>
      <Link to='/users' >users</Link>
      {user && <><h2>{user.username} logged in</h2><button onClick={handleLogout}>logout</button></>}
    </div>
  )
}

export default connect(
  state => ({ user: state.user })
)(Menu)