const express = require('express');
const { pick } = require('lodash');

const Todo = require('../../models/user');

const router = express.Router();

router
  .post('/', (req, res) => {
    const newTodo = new Todo({
      text: req.body.text,
    });
  });

module.exports = router;
