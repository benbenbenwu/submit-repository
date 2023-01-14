import { useState } from "react"
const Authors = (props) => {
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }
  const authors = props.authors
  const token = props.token

  const handleSubmit = async e => {
    e.preventDefault()
    const name = e.target.select.value
    const setBornTo = Number(born)
    props.editAuthor({ variables: { name, setBornTo } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        token
        &&
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={handleSubmit}>
            <select name="select">
              {
                authors.map(a =>
                  <option key={a.id} value={a.name}>{a.name}</option>
                )
              }
            </select>
            <div>
              born<input type="number" value={born} onChange={e => setBorn(e.target.value)} />
            </div>
            <button type="submit">update birthyear</button>
          </form>
        </>
      }
    </div>
  )
}

export default Authors
