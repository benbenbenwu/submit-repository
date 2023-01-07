import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateVotes } from '../services/anecdote'

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      return [...state.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s)];
    },
    createAnecdote(state, action) {
      const anecdote = action.payload
      console.log(anecdote);
      return [...state, anecdote]
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAsync = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVoteAsync = anecdote => {
  return async dispatch => {
    await updateVotes(anecdote)
    dispatch(addVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer