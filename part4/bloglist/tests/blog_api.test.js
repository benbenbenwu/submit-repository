const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_help')


const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
  /*   {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    } */
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {

    const res = await helper.blogInDb()

    expect(res).toHaveLength(blogs.length)

  })


})

describe('viewing a specific blog', () => {

  test('all blogs have only one id', async () => {

    const res = await helper.blogInDb()

    expect(() => res.every(blog => blog.hasOwn('id'))).toBeDefined()

  })


})


describe('addition of a new blog', () => {
  test('bolg without likes', async () => {

    const users = await helper.userInDb()
    const userId = users[0].id

    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      userId
    }

    const res = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(res.text).toBe("0")
  })


  test('blog without title or url is not added', async () => {

    const newBlog = {
      author: "Edsger W. Dijkstra"
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(blogs.length)

  })

  test('a valid blog can be added', async () => {
    const users = await helper.userInDb()
    const userId = users[0].id
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      userId
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    const titles = res.body.map(blog => blog.title)

    expect(res.body).toHaveLength(blogs.length + 1)
    expect(titles).toContain("Canonical string reduction")

  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {

    const blogsStart = await helper.blogInDb()
    const blogDelete = blogsStart[0]


    await api
      .delete(`/api/blogs/${blogDelete.id}`)
      .expect(204)

    const blogsEnd = await helper.blogInDb()
    expect(blogsEnd).toHaveLength(blogs.length - 1)

    const titles = blogsEnd.map(b => b.title)
    expect(titles).not.toContain(blogDelete.title)

  })
})

describe('updation of a blog', () => {
  test('succeed with status 200 and return 1', async () => {
    const blogsStart = await helper.blogInDb()
    const blogUpdate = blogsStart[0]

    const res = await api
      .put(`/api/blogs/${blogUpdate.id}`)
      .send({ updateLikes: 99 })
      .expect(200)

    expect(res.text).toBe("1")
  })
})

afterAll(() => {
  mongoose.connection.close()
})