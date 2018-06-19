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

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});
module.exports = blogsRouter;
