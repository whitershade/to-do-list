const validator = require('validator');
const mongoose = require('../db/mongoose');

const User = mongoose.model('User', {
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
    require: true,
    minlength: 9,
  },
  tokens: [{
    accesss: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});


module.exports = User;
