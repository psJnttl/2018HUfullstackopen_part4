const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  try {
    if (request.body.password && request.body.password.length < 3) {
      return response.status(400).send({error: 'password length must be at least 3'});
    }
    const existingUser = await User.find({username: request.body.username});
    if (existingUser.length > 0) {
      return response.status(400).send({error: 'must be unique username'});
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds);
    const user = new User({
      username: request.body.username,
      name: request.body.name,
      adult: request.body.adult ? request.body.adult : true,
      password: passwordHash
    });
    const resultFromServer = await user.save();
    const result = User.format(resultFromServer);
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }
});

userRouter.get('/', async(request, response) =>  {
  try {
    const users = await User.find({}).populate('blogs', {user:0, __v:0});
    const result = users.map((u) => User.format(u));
    response.json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }

});

module.exports = userRouter;
