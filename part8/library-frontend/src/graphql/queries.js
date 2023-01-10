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
      author
      genres
      id
      published
      title
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