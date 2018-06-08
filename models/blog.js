const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoUrl = process.env.FS18_PART4_MLAB_DB;
mongoose.connect(mongoUrl)

const Blogschema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

Blogschema.statics.formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const Blog = mongoose.model('Blog', Blogschema);

module.exports = Blog
