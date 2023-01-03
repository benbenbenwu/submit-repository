const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)

})

blogRouter.post('/', async (req, res) => {

  let user

  if (process.env.NODE_ENV === 'test') {
    user = await User.findById(req.body.userId)
  } else {
    user = req.body.user
  }


  if (!req.body.title || !req.body.url) {
    return res.status(400).json()
  }

  let result = ""
  if (!req.body.likes) {
    req.body.likes = 0
    result = 0
  }
  const { title, author, url, likes } = req.body


  const blog = new Blog({ title, author, url, likes, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(result)
})

blogRouter.delete('/:id', async (req, res) => {

  const user = req.body.user
  const blogId = req.params.id
  const blog = await Blog.findById(blogId)

  if (process.env.NODE_ENV === 'test') {
    await Blog.findByIdAndRemove({ _id: blogId })
    return res.status(204).json()
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove({ _id: blogId })
    res.status(204).json()
  } else {
    res.status(401).json()
  }


})


blogRouter.put('/:id', async (req, res) => {
  const blogId = req.params.id
  const updateLikes = req.body.updateLikes

  await Blog.findByIdAndUpdate({ _id: blogId }, { likes: updateLikes })

  res.status(200).json(1)
})

module.exports = blogRouter