const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const oneFavorite = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  likes: 5
}

const oneAuthor = {
  author: 'Edsger W. Dijkstra',
  blogs: 1
}

const oneLikes = {
  author: 'Edsger W. Dijkstra',
  likes: 5
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const favorite = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12
}

const mostBlogAuthor = {
  author: 'Robert C. Martin',
  blogs: 3
}

const mostLikeAuthor = {
  author: 'Edsger W. Dijkstra',
  likes: 17
}
describe('4.3: dummy', () => {
  test('returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('4.4 total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('4.5 favorite blog', () => {
  test('of empty list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only one blog, equals it the only blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(oneFavorite)
  })

  test('of a bigger list, equals to the most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(favorite)
  })
})

describe('4.6 most blogs', () => {
  test('of empty list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has only one blog, equals its author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(oneAuthor)
  })

  test('of a bigger list, equals to the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogAuthor)
  })
})

describe('4.7 most likes', () => {
  test('of empty list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has only one blog, equals its author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(oneLikes)
  })

  test('of a bigger list, equals to the author with the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikeAuthor)
  })
})