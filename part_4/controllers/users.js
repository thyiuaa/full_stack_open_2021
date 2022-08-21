const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')

const saltRounds = 10

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

const isPasswordValid = (password) => {
  if (!password || password.length < 3) {
    return false
  }

  return true
}

const isUsernameValid = async (username) => {
  if (!username || username.length < 3) {
    return false
  }

  const isUserExist = await User.exists({ username })

  return isUserExist
}

const isNewUserValid = async (username, password) => {
  return await isUsernameValid(username) && isPasswordValid(password)
}

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

  if (!isNewUserValid(username, password)) {
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
