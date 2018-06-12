const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      const result = blogs.map((b) => Blog.formatBlog(b));
      response.json(result)
    })
    .catch(error => {
      console.log(error);
    });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => {
      console.log(error);
    });
});
module.exports = blogsRouter;