const express = require('express');


const contollers = require('./controllers');
const middlewares = require('./middlewares');

const router = express.Router();

router
  .get('/me', middlewares.authenticate, contollers.getMe)
  .post('/', contollers.createItem)
  .post('/login', contollers.login);


module.exports = router;
