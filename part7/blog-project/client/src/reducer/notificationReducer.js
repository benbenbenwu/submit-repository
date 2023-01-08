import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: 'none', mess: '' },
  reducers: {
    setNotification(state, action) {
      const { type, mess } = action.payload
      if (!action.payload) {
        return { type: 'none', mess: '' }
      } else {
        return { type, mess }
      }
    }
  }
})


export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer