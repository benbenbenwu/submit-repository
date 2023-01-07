import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm anecdotes={anecdotes} vote={vote} />
      <AnecdoteList addAnecdote={addAnecdote} />
    </div>
  )
}

export default App