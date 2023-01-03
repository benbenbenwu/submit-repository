const Blog = require('../models/blog')
const User = require('../models/user')

const blogInDb = async () => {

  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const userInDb = async () => {

  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = { blogInDb, userInDb }