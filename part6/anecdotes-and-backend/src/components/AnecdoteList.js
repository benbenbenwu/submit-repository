import { connect } from "react-redux"
import { addVoteAsync } from '../reducers/anecdoteReducer'
import { addSuccessMessage } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, filterString, addVoteAsync, addSuccessMessage }) => {

  const vote = anecdote => {
    addVoteAsync(anecdote)
    addSuccessMessage(anecdote.content)
    setTimeout(() => {
      addSuccessMessage('')
    }, 5000)
  }


  const filterAnecdotes = () => filterString
    ? anecdotes.filter(a => a.content.includes(filterString))
    : anecdotes


  return (
    <>
      {filterAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default connect(
  state => ({
    anecdotes: state.anecdotes,
    filterString: state.filter
  }),
  {
    addVoteAsync,
    addSuccessMessage
  }
)(AnecdoteList)