const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds);
    console.log('passwordHash: ', passwordHash);
    const user = new User({
      username: request.body.username,
      name: request.body.name,
      adult: request.body.adult,
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
    const users = await User.find({});
    const result = users.map((u) => User.format(u));
    response.json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }

});

module.exports = userRouter;
