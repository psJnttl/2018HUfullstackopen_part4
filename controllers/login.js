const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  let passwdOK;
  if (user) {
    passwdOK = await bcrypt.compare(body.password, user.password);
  }
  else {
    return response.status(401).send({error: 'invalid username'});
  }
  if (!passwdOK) {
    return response.status(401).send({error: 'invalid password'});
  }

  const tokenUser = {
    id: user._id,
    username: user.username
  };
  const token = jwt.sign(tokenUser, process.env.JSONWEBTOKEN_SECRET);
  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
