const express = require('express');


const contollers = require('./controllers');
const middlewares = require('./middlewares');

const router = express.Router();

router
  .get('/me', middlewares.authenticate, contollers.getItems)
  // .get(
  //   '/:id',
  //   middlewares.checkIsIdValid,
  //   contollers.getItem,
  // )
  .post('/', contollers.createItem);
// .delete('/:id', contollers.deleteItem)
// .patch(
//   '/:id',
//   middlewares.checkIsIdValid,
//   middlewares.checkIfTodoCompleted,
//   contollers.updateItem,
// );


module.exports = router;
