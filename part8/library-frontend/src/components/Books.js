import { useEffect, useState } from "react"

const Books = (props) => {

  const [books, setBooks] = useState([])
  const [fliterBooks, setFliterBooks] = useState([])


  useEffect(() => {
    setBooks(props.books)
    setFliterBooks(props.books)
  }, [props.books])

  if (!props.show) {
    return null
  }


  const allGeners = props.genres

  const handleFilter = genre => {
    if (genre === 'all') {
      setFliterBooks(books)
    } else {
      setFliterBooks(books.filter(b => b.genres.includes(genre)))
    }
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {fliterBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        allGeners.map(g =>
          <button key={g} onClick={() => handleFilter(g)}>{g}</button>
        )
      }
      <button onClick={() => handleFilter('all')}>all genres</button>
    </div>
  )
}

export default Books
