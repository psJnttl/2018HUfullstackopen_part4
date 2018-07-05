const mongoose = require('mongoose');

const Blogschema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

Blogschema.statics.formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  };
};

const Blog = mongoose.model('Blog', Blogschema);

module.exports = Blog;
