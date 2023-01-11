import { Link } from 'react-router-dom'

const Blog = ({ blog, setBlogs, user }) => {

  /*   const [blogVisible, setBlogVisible] = useState(false)
  
    const showWhenVisible = { display: blogVisible ? 'none' : '', border: '2px solid black', marginTop: '10px' }
    const hidenWhenVisible = { display: blogVisible ? '' : 'none', border: '2px solid black', marginTop: '10px' } */



  return <>
    <div style={{ border: '2px solid black', marginTop: '10px' }}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      {/* <button onClick={() => setBlogVisible(true)}>view</button> */}
    </div>
    {/* <div style={hidenWhenVisible}>
      <p>{blog.title}</p> <button onClick={() => setBlogVisible(false)}>hide</button>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p> <button onClick={handleLike}>like</button>
      <p>{blog.author}</p>
      <button onClick={handleRemove}>remove</button>
    </div> */}
  </>
}



export default Blog