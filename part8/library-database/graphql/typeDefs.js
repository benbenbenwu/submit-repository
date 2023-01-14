const { gql } = require('apollo-server')

module.exports = gql`
  type Author{
    name: String!,
    id:ID!,
    born:Int,
    bookCount:Int
  }
  type Book{
    title:String!,
    published:Int!,
    author:Author!,
    id:ID!,
    genres:[String!]!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
    favouriteGenre:String!
  }
  
  type Query {
    booksCount:Int!,
    authorsCount:Int!,
    allBooks(author:String,genre:String):[Book!]!,
    allAuthors:[Author!]!,
    me:User,
    allGenres:[String!]!
  }
  type Mutation{
    addBook(
      title:String!,
      published:Int!,
      author:String!,
      genres:[String!]!
    ):Book,
    editAuthor(
      name:String!,
      setBornTo:Int!
    ):Author,
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`