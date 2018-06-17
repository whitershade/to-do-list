const express = require('express');
const path = require('path');

const todos = require('./todos');


const router = express.Router();

router.use('/api/todos', todos);

if (process.env.NODE_ENV === 'production') {
  router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


module.exports = router;
