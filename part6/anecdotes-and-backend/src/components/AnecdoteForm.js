import { connect } from 'react-redux'
import { createNewAsync } from '../reducers/anecdoteReducer'
import { addSuccessMessage } from '../reducers/notificationReducer'


const AnecdoteForm = ({ createNewAsync, addSuccessMessage }) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    createNewAsync(anecdote)
    addSuccessMessage('add new anecdote success!!')
    event.target.anecdote.value = ''
    setTimeout(() => {
      addSuccessMessage('')
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input type='text' name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  {
    createNewAsync,
    addSuccessMessage
  }
)(AnecdoteForm)