const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogsRouter = require('./controllers/blogs');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoUrl = process.env.FS18_PART4_MLAB_DB;
mongoose
  .connect(mongoUrl)
  .then( () => {
    console.log('connected to database', process.env.FS18_PART4_MLAB_DB)
  })
  .catch( err => {
    console.log(err)
  });

morgan.token('body', function (req, res) {
  let body = req.body ? req.body : {};
  return JSON.stringify(body);
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.body(req, res),
    'Status:', tokens.status(req, res), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
