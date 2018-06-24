const validator = require('validator');
const jwt = require('jsonwebtoken');
const { pick } = require('lodash');
const mongoose = require('../db/mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not an valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 9,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});

UserSchema.methods.toJSON = function toJSON() {
  const user = this;
  const userObject = user.toObject();

  return pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this;

  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123');

  user.tokens = user.tokens.concat({ access, token });

  return user.save().then(() => token);
};


module.exports = mongoose.model('User', UserSchema);
