import { createSlice } from "@reduxjs/toolkit";
import { getAll, create } from "../services/blogs";
import { setNotification } from "./notificationReducer";


const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      return action.payload
    },
    createNewBlog(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { getBlogs, createNewBlog } = blogsSlice.actions

export const getBlogsAsnyc = () => {
  return async dispatch => {
    const blogs = await getAll()
    dispatch(getBlogs(blogs))
  }
}

export const createBlogAsnyc = blog => {
  return async dispatch => {
    try {
      const newBlog = await create(blog)
      dispatch(createNewBlog(newBlog))
      setNotification({ type: 'success', mess: `a new blog ${newBlog.title} by ${newBlog.author} added` })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      setNotification({ type: 'error', mess: 'Wrong messages' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }

  }
}

export default blogsSlice.reducer