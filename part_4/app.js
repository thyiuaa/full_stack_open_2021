const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

const connectMongo = async () => {
  try {
    await mongoose.connect(
      config.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
      }
    )

    console.info('connected to MongoDB')
  } catch (err) {
    console.error('error connecting to MongoDB:', err.message)
  }
}

const createApp = async () => {
  console.info('connecting to', config.MONGODB_URI)

  await connectMongo()

  app.use(cors())
  app.use(express.json())

  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter)
}

createApp()

module.exports = app
