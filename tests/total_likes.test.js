const totalLikes = require('../utils/list_helper').totalLikes;
const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const mostBlogs = require('../utils/list_helper').mostBlogs;
const mostLikes = require('../utils/list_helper').mostLikes;

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('empty array equals 0', () => {
    const sum = totalLikes([]);
    expect(sum).toBe(0);
  });

  test('null array equals 0', () => {
    const sum = totalLikes(null);
    expect(sum).toBe(0);
  });

  test('Six blogs likes sum 36', () => {
    const sum = totalLikes(blogs);
    expect(sum).toBe(36);
  });
});

describe('favorite blog', () => {
  test('empty array equals null', () => {
    const fav = favoriteBlog([]);
    expect(fav).toBe(null);
  });
  test('null array equals null', () => {
    const fav = favoriteBlog(null);
    expect(fav).toBe(null);
  });
  test('array of blogs yields Dijkstra', () => {
    const fav = favoriteBlog(blogs);
    expect(fav).toEqual(blogs[2]);
  });
});

describe('most blogs', () => {
  test('empty array equals null', () => {
    const most = mostBlogs([]);
    expect(most).toBe(null);
  });
  test('null array equals null', () => {
    const most = mostBlogs(null);
    expect(most).toBe(null);
  });
  test('Robert C. Martin has the most blogs.', () => {
    const most = mostBlogs(blogs);
    expect(most).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('most likes', () =>{
  test('empty array equals null', () => {
    const likes = mostLikes([]);
    expect(likes).toBe(null);
  });
  test('null array equals null', () => {
    const likes = mostLikes(null);
    expect(likes).toBe(null);
  });
  test('Edsger W. Dijkstra has most likes', () => {
    const likes = mostLikes(blogs);
    expect(likes).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
