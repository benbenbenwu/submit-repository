import { useEffect, useState } from 'react'

const Recommond = ({ show, books, favouriteGenre }) => {

  const [fliterBooks, setFilterBooks] = useState([])

  useEffect(() => {
    const newBooks = books.filter(b => b.genres.includes(favouriteGenre))
    setFilterBooks(newBooks)
  }, [books, favouriteGenre])
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommondations</h2>
      <p>book is your favourtite genre <strong>{favouriteGenre}</strong></p>
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
    </div>
  )
}

export default Recommond