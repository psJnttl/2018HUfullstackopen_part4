const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl);
  })
  .catch( err => {
    console.log(err);
  });

app.use(middleware.mLogger);
app.use(cors());
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.error);

const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = {
  app,
  server
};
