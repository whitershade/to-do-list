const express = require('express');


const contollers = require('./controllers');
const middlewares = require('./middlewares');

const router = express.Router();

router
  .get('/', contollers.getTodos)
  .get(
    '/:id',
    middlewares.checkIsIdValid,
    contollers.getTodo,
  )
  .post('/', contollers.createTodo)
  .delete('/:id', contollers.deleteTodo)
  .patch(
    '/:id',
    middlewares.checkIsIdValid,
    middlewares.checkIfTodoCompleted,
    contollers.updateTodo,
  );


module.exports = router;
