import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR } from './graphql/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'


const App = () => {
  const [page, setPage] = useState('authors')
  const { loading: loadingAuthors, data: dataAuthors } = useQuery(ALL_AUTHORS)
  const { loading: loadingBooks, data: dataBooks } = useQuery(ALL_BOOKS)
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }]
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })


  if (loadingAuthors || loadingBooks) { return <div>loading...</div> }

  const authors = dataAuthors.allAuthors
  const books = dataBooks.allBooks

  return (
    <div style={{ padding: '10px 50px' }}>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors} editAuthor={editAuthor} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} createBook={createBook} />
    </div>
  )
}

export default App
