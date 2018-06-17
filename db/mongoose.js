const mongoose = require('mongoose');


mongoose.Promise = global.Promise; // Use native promises instead of mpromise
mongoose.connect(process.env.MONGODB_URI);


module.exports = mongoose;
