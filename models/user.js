const validator = require('validator');
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
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

UserSchema.statics.findByToken = function findByToken(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.pre('save', function preUserSchema(next) {
  const user = this;

  if (user.isModified('password')) {
    brcypt.genSalt(10, (saltErr, salt) => {
      brcypt.hash(user.password, salt, (hashErr, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


module.exports = mongoose.model('User', UserSchema);
