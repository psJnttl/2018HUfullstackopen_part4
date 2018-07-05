const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async(request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {_id:1, name:1, username:1});
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
    const allUsers = await User.find({});
    const tmpAuthor = allUsers[0];
    blog.user = tmpAuthor._id;
    const resultFromServer = await blog.save();
    tmpAuthor.blogs.push(resultFromServer._id);
    await tmpAuthor.save();
    const result = Blog.formatBlog(resultFromServer);
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }
});

blogsRouter.delete('/:id', async(request, response) => {
  try {
    const status = await Blog.findByIdAndRemove(request.params.id);
    if (status) {
      response.status(204).end();
    }
    else {
      response.status(404).end();
    }
  } catch (error) {
    if (error.name === 'CastError' && error.path === '_id') {
      response.status(400).send({ error: 'malformed id' });
    }
    else {
      console.log(error);
      response.status(500).send({ error: 'server error' });
    }
  }
});

blogsRouter.put('/:id', async(request, response) => {
  const modBlog = {
    'title': request.body.title,
    'author': request.body.author,
    'url': request.body.url,
    'likes': request.body.likes
  };
  for (let attr in modBlog) {
    if (!modBlog[attr]) {
      return response.status(400).send({error: 'incomplete blog'});
    }
  }
  const id = request.params.id;
  try {
    const status = await Blog.findByIdAndUpdate(id, modBlog, { new: true });
    if (status) {
      const result = Blog.formatBlog(status);
      response.status(200).json(result);
    }
    else {
      response.status(404).end();
    }
  } catch (error) {
    if (error.name === 'CastError' && error.path === '_id') {
      response.status(400).send({ error: 'malformed id' });
    }
    else {
      console.log(error);
      response.status(500).send({ error: 'server error' });
    }
  }
});

module.exports = blogsRouter;
