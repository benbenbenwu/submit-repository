

const AnecdoteList = ({ anecdotes, vote, filterString }) => {

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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList