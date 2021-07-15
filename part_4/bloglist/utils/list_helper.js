const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    return blogs.reduce((prev, curr) => {
      return prev+curr.likes
    }, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const favorite = blogs.reduce((prev, curr) => {
      return curr.likes > prev.likes ? curr : prev
    })
    // console.log(favorite)
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const blogCount = lodash.countBy(blogs, 'author')
    let result = { author: 'error', blogs: -1 }
    lodash.forEach(blogCount, (value, key) => {
      if (value > result.blogs) {
        result = { author: key, blogs: value }
      }
    })
    return result
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const groupedBlogs = lodash.groupBy(blogs, 'author')
    let result = { author: 'error', likes: -1 }

    lodash.map(groupedBlogs, (value, key) => {
      const likes = value.reduce((prev, curr) => {
        return prev+curr.likes
      }, 0)
      if (likes > result.likes) {
        result = { author: key, likes: likes }
      }
    })

    return result
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
