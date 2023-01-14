const Book = require('../model/book')
const Author = require('../model/author')
const User = require('../model/user')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')


module.exports = {
  Query: {
    booksCount: async () => Book.collection.countDocuments(),
    authorsCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args

      if (!author && !genre) {
        const res = await Book.find({}).populate('author', { name: 1, born: 1 })
        console.log(res);
        return res
      }
      if (author) {
        return await Book.find({ author })
      }

      if (genre) {
        return await Book.find({ genres: { $in: [genre] } })
      }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const allBooks = await Book.find({})
      console.log(allBooks);

      let arr = []
      allBooks.forEach(n => n.genres.forEach(a => arr.push(a)))
      arr = [...new Set(arr)]
      console.log(arr);
      return arr
    }
  },
  Author: {
    bookCount: async (root) => {
      const res = await Book.find({ author: root._id })
      return res.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const { title, author, published, genres } = args
      const currentUser = context.currentUser


      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const selectAuthor = await Author.find({ name: author })
      const id = selectAuthor[0]._id
      const newBook = new Book({ title, author: id, published, genres })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return newBook
    },
    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name })
      author.born = setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
    createUser: async (root, args) => {
      const { username, favouriteGenre } = args
      const user = new User({ username, favouriteGenre })
      try {
        user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })

      }
      return user
    },
    login: async (root, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })
      if (!user || password !== 'sss') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = { username, id: user._id }

      const favouriteGenre = user.favouriteGenre

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET), favouriteGenre }
    }
  }
}
