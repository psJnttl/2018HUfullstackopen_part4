const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const middleware = require('./utils/middleware');
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

app.use(middleware.mLogger);
app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);
app.use(middleware.error);
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
