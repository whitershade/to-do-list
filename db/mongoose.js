const mongoose = require('mongoose');


mongoose.Promise = global.Promise; // Use native promises instead of mpromise
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports = mongoose;
