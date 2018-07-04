const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    'title': 'Tekoäly on jaksaa pidempään kuin sinä.',
    'author': 'Teemu Lesonen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
  {
    'title': 'Tunnista tekotunteet.',
    'author': 'Saija Nairanen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
  {
    'title': 'Miten pääsen eroon teko-oppimisesta.',
    'author': 'Henri Hera-Keirinen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
];

const getAllBlogs = async () => {
  const blogsRaw = await Blog.find({});
  const blogs = blogsRaw.map( (b) => {
    return Blog.formatBlog(b);
  });
  return blogs;
};

const initialUsers = [
  {
    username: 'leso',
    name: 'Kimmo Lesonen',
    adult: true
  },
  {
    username: 'admin',
    name: 'Adam Ant',
    adult: false
  }
];

const getAllUsers = async () => {
  const usersRaw = await User.find({});
  const users = usersRaw.map( (u) => {
    return User.format(u);
  });
  return users;
};

module.exports = {
  initialBlogs, getAllBlogs, initialUsers, getAllUsers
};
