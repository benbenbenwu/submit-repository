import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async content => {
  const response = await axios.post(baseUrl, {
    content,
    votes: 0
  })
  return response.data
}

export const updateVotes = async anecdote => {
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${anecdote.id}`,
    { ...anecdote, votes: anecdote.votes + 1 },

  )
  return response.data
}