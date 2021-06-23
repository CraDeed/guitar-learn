const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { postSchema } = require('./post');

const userSchema = mongoose.Schema(
  {
    username: String,
    hashedPassword: String,
    image: String,
    guitarSkill: String,
    introduction: String,
    post: [postSchema],
  },
  { versionKey: false }
);

userSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

userSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
