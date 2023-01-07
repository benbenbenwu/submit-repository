import { filterAnecdote } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ filterAnecdote }) => {



  const handleChange = (event) => {
    filterAnecdote(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  {
    filterAnecdote
  }
)(Filter)