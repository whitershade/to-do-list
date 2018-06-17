const express = require('express');
const todos = require('./todos');


const router = express.Router();

router.use('/todos', todos);
router.all('/*', (req, res) => res.sendStatus(404));


module.exports = router;
