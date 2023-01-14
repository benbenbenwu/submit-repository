import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR, ALL_GENRES } from './graphql/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommond from './components/Recommond'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const [favouriteGenre, setFavouriteGenre] = useState('')

  const { loading: loadingAuthors, data: dataAuthors } = useQuery(ALL_AUTHORS)
  const { loading: loadingBooks, data: dataBooks } = useQuery(ALL_BOOKS)
  const { loading: loadingGenres, data: dataGenres } = useQuery(ALL_GENRES)

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }]
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })


  if (loadingAuthors || loadingBooks || loadingGenres) { return <div>loading...</div> }



  const authors = dataAuthors.allAuthors
  const books = dataBooks.allBooks
  const genres = dataGenres.allGenres

  const handleLogout = () => {
    setToken('')
    setFavouriteGenre('')
    window.localStorage.removeItem('token')
  }


  return (
    <div style={{ padding: '10px 50px' }}>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommond')}>recommond</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors={authors} editAuthor={editAuthor} token={token} />

      <Books show={page === 'books'} books={books} genres={genres} />

      {token && <NewBook show={page === 'add'} createBook={createBook} />}

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} setFavouriteGenre={setFavouriteGenre} />
      {token && <Recommond show={page === 'recommond'} books={books} favouriteGenre={favouriteGenre} />}
    </div>
  )
}

export default App
