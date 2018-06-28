const mongoose = require('../../db/mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
}, { timestamps: true });


module.exports = mongoose.model('Todo', TodoSchema);
