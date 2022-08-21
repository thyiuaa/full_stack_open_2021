const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const saltRounds = 10

const initialBlogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 2
  }
]

const newBlog = {
  title: 'title3',
  author: 'author3',
  url: 'url3',
  likes: 3
}

const newBlogWithoutLikes = {
  title: 'title4',
  author: 'author4',
  url: 'url4',
}

const newBlogWithoutTitle = {
  author: 'author5',
  url: 'url5',
  likes: 5
}

const newBlogWithoutUrl = {
  title: 'title6',
  author: 'author6',
  likes: 6
}

const newUserNames = [
  'user1',
]
const newUsers = [
  {
    username: newUserNames[0],
    name: 'name1',
    password: 'password1'
  }
]

const singleBlogId = async () => {
  let blog = new Blog(newBlog)
  await blog.save()
  blog = await Blog.findOne()
  return blog.id
}

const nonExistingId = async () => {
  let blog = new Blog(newBlog)
  await blog.save()
  blog = await Blog.findOne()
  const id = blog.id
  await blog.remove()
  return id
}

const insertNewUsers = async () => {
  for (const newUser of newUsers) {
    const { password } = newUser
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = new User({
      ...newUser,
      password: hashedPassword
    })

    await user.save()
  }
}

const update_likes = {
  likes: 1
}

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  newBlogWithoutUrl,
  singleBlogId,
  nonExistingId,
  update_likes,

  // usres
  newUserNames,
  insertNewUsers,
}
