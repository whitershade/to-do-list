const express = require('express');
const { pick } = require('lodash');

const Todo = require('../../models/todo');
const checkIsIdValid = require('../../middlewares/todos/checkIsIdValid');
const checkIfTodoCompleted = require('../../middlewares/todos/checkIfTodoCompleted');

const router = express.Router();

router
  .get('/', (req, res) => {
    Todo
      .find()
      .then((todosResponse) => {
        const todos = {};

        todosResponse.forEach((todo) => {
          todos[todo._id] = todo;
        });

        res.send({ todos });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .get('/:id', checkIsIdValid, (req, res) => {
    Todo
      .findById(req.params.id)
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .post('/', (req, res) => {
    const newTodo = new Todo({
      text: req.body.text,
    });

    newTodo
      .save()
      .then((doc) => {
        res.send(doc);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .delete('/:id', checkIsIdValid, (req, res) => {
    Todo
      .findByIdAndRemove(req.params.id)
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .patch('/:id', checkIsIdValid, checkIfTodoCompleted, (req, res) => {
    const body = pick(req.body, ['text', 'completed', 'completedAt']);

    Todo
      .findByIdAndUpdate(req.params.id, { $set: body }, { new: true })
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  });


module.exports = router;
