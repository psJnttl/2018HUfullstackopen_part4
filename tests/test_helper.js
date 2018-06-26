const Blog = require('../models/blog');

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

module.exports = {
  initialBlogs, getAllBlogs
};
