const express = require('express');


const controllers = require('./controllers');
const middlewares = require('./middlewares');

const router = express.Router();

router
  .get('/me', middlewares.authenticate, controllers.getMe)
  .post('/', controllers.createItem)
  .post('/login', controllers.login)
  .delete('/me/token', middlewares.authenticate, controllers.deleteItem);


module.exports = router;
