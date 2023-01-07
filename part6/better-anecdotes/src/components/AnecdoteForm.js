
const AnecdoteForm = ({ addAnecdote }) => {

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

export default AnecdoteForm