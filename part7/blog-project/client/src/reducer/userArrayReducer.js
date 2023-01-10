import { createSlice } from "@reduxjs/toolkit";
import { getALLUser } from "../services/users";


const userArraySlice = createSlice({
  name: 'userArray',
  initialState: [],
  reducers: {
    setUserArray(state, action) {
      return action.payload
    }
  }
})

export const { setUserArray } = userArraySlice.actions


export const getAllUserAsync = () => {
  return async dispatch => {
    const userArray = await getALLUser()
    dispatch(setUserArray(userArray))
  }
}


export default userArraySlice.reducer