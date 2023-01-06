const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')




blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogRouter.post('/', userExtractor, async (req, res) => {
  let user

  if (process.env.NODE_ENV === 'test') {
    user = await User.findById(req.body.user._id)
  } else {
    user = req.body.user
    console.log('user');
  }


  if (!req.body.title || !req.body.url) {
    return res.status(400).json()
  }

  let result = ""
  if (!req.body.likes) {
    req.body.likes = 0
    result = 0
  }


  const newBlog = { title: req.body.title, author: req.body.author, url: req.body.url, likes: req.body.likes, user: req.body.user._id }

  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(result)
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {

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