const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  adult: Boolean
});

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
