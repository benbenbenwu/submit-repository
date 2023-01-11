import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'
import userArrayReducer from './userArrayReducer'
import commentsReducer from './commentsReducer'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    userArray: userArrayReducer,
    comments: commentsReducer
  }
})