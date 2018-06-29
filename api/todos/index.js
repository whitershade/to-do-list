const express = require('express');


const contollers = require('./controllers');
const middlewares = require('./middlewares');
const userMiddlewares = require('../users/middlewares');

const router = express.Router();

router
  .get(
    '/',
    userMiddlewares.authenticate,
    contollers.getItems,
  )
  .get(
    '/:id',
    userMiddlewares.authenticate,
    middlewares.checkIsIdValid,
    contollers.getItem,
  )
  .post(
    '/',
    userMiddlewares.authenticate,
    contollers.createItem,
  )
  .delete(
    '/:id',
    userMiddlewares.authenticate,
    middlewares.checkIsIdValid,
    contollers.deleteItem,
  )
  .patch(
    '/:id',
    userMiddlewares.authenticate,
    middlewares.checkIsIdValid,
    middlewares.checkIfTodoCompleted,
    contollers.updateItem,
  );


module.exports = router;
