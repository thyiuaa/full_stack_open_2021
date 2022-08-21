const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')

const saltRounds = 10

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  console.log({
    body: request.body
  })
  const {
    username,
    name,
    password,
  } = request.body

  console.log({
    username,
    name,
    password
  })

  if (
    username === undefined ||
    name === undefined ||
    password === undefined
  ) {
    response.status(400).end()

    return
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    password: hashedPassword,
  })
  const result = await user.save()

  response.status(201).json(result)
})

module.exports = usersRouter
