import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnecdote } from './reducers/anecdoteReducer'
import { addSuccessMessage } from './reducers/notificationReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterString = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(addSuccessMessage(content))
    setTimeout(() => {
      dispatch(addSuccessMessage(''))
    }, 5000)
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    dispatch(addSuccessMessage('add new anecdote success!!'))
    setTimeout(() => {
      dispatch(addSuccessMessage(''))
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList anecdotes={anecdotes} vote={vote} filterString={filterString} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App