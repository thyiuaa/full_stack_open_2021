const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
require('express-async-errors')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObj = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArr = blogObj.map(blog => blog.save())
  await Promise.all(promiseArr)
})

describe('4.8', () => {
  test('response is json', () => {
    api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
    const returnedBlogs = response.body

    expect(returnedBlogs.length).toBe(helper.initialBlogs.length)
  })
})

describe('4.9', () => {
  test('property "id" exist', async () => {
    const response = await api.get('/api/blogs')
    const returnedBlogs = response.body

    returnedBlogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('4.10', () => {
  test.skip('total number of blogs increased by 1', async () => {
    await api.post('/api/blogs')
      .send(helper.newBlog)
    const response = await api.get('/api/blogs')
    const returnedBlogs = response.body

    const expectLength = helper.initialBlogs.concat(helper.newBlog).length
    expect(returnedBlogs).toHaveLength(expectLength)
  })
})

describe('4.11', () => {
  test('property "like" is set to default 0', async () => {
    await api.post('/api/blogs')
      .send(helper.newBlogWithoutLikes)
    const response = await api.get('/api/blogs')
    const returnedBlogs = response.body

    returnedBlogs.forEach(blog => {
      expect(blog.likes).toBeDefined()
      expect(blog.likes).toBeGreaterThanOrEqual(0)
    })
  })
})

describe('4.12', () => {
  test('block POST request if property "title" is missing', async () => {
    await api.post('/api/blogs')
      .send(helper.newBlogWithoutTitle)
      .expect(400)
  })

  test('block POST request if property "url" is missing', async () => {
    await api.post('/api/blogs')
      .send(helper.newBlogWithoutUrl)
      .expect(400)
  })
})

describe('4.13', () => {
  test('delete a exist entry', async () => {
    await api.delete(`/api/blogs/${await helper.singleBlogId()}`)
      .expect(204)
  })

  test('delete a non-exist entry', async () => {
    await api.delete(`/api/blogs/${await helper.singleBlogId()}`)
      .expect(204)
  })
})

describe('4.14', () => {
  test('update a exist entry', async () => {
    await api.put(`/api/blogs/${await helper.singleBlogId()}`)
      .send(helper.update_likes)
      .expect(204)
  })

  test('update a non-exist entry', async () => {
    await api.put(`/api/blogs/${await helper.nonExistingId()}`)
      .send(helper.update_likes)
      .expect(204)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
