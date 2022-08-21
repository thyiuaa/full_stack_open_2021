const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
    return
  }

  const result = blog.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body.update)

  response.status(204).end()
})

module.exports = blogsRouter
