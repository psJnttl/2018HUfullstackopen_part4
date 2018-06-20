const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async(request, response) => {
  try {
    const blogs = await Blog.find({});
    const result = blogs.map((b) => Blog.formatBlog(b));
    response.json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }
});

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body);
    if (!blog.title || !blog.author || !blog.url) {
      return response.status(400).send({error: 'title, author or url missing'});
    }
    if (!blog.likes) {
      blog.likes = 0;
    }
    const resultFromServer = await blog.save();
    const result = Blog.formatBlog(resultFromServer);
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }
});
module.exports = blogsRouter;
