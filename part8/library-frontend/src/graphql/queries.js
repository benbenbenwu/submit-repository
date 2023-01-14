import { gql } from '@apollo/client'


export const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
    bookCount
    born
    id
    name
  }
}
`

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      published
      id
      genres
      author {
        name
        born
      }
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    id
    genres
    author {
      born
      name
    }
  }
}
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      author
      genres
      published
      title
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      favouriteGenre
    }
  }
`

export const ALL_GENRES = gql`
  query AllGenres {
    allGenres
  }
`