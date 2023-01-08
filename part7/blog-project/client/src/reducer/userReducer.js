import { createSlice } from "@reduxjs/toolkit";
import { login } from "../services/login";
import { setToken } from "../services/blogs";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions


export const setUserAsnyc = user => {
  return async dispatch => {
    try {
      const loginUser = await login(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(loginUser)
      )
      setToken(loginUser.token)
      dispatch(setUser(loginUser))
      dispatch(setNotification({ type: 'success', mess: `${user.username} logged in success!!` }))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 3000)
    } catch (error) {
      dispatch(setNotification({ type: 'error', mess: 'Wrong username or password' }))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 3000)
    }
  }
}


export default userSlice.reducer