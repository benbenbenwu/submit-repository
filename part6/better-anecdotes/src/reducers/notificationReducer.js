import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addSuccessMessage(state, action) {
      const message = `you voted ${action.payload}`
      return action.payload ? message : ''
    }
  }
})


export const { addSuccessMessage } = notificationSlice.actions


export default notificationSlice.reducer