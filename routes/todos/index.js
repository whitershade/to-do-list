const express = require('express');
const { ObjectID } = require('mongodb');
const { pick } = require('lodash');

const Todo = require('../../models/todo');


const router = express.Router();

router
  .get('/', (req, res) => {
    Todo
      .find()
      .then((todos) => {
        res.send({ todos });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .get('/:id', (req, res) => {
    const { params: { id } } = req;

    if (!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findById(id).then((todo) => {
      if (!todo) return res.status(404).send();

      res.send({ todo });
    }).catch((e) => {
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

  .delete('/:id', (req, res) => {
    const { params: { id } } = req;

    if (!ObjectID.isValid(id)) return res.status(404).send();

    Todo
      .findByIdAndRemove(id)
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .patch('/:id', (req, res) => {
    const { params: { id } } = req;

    if (!ObjectID.isValid(id)) return res.status(404).send();

    const body = pick(req.body, ['text', 'completed']);

    if (body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completedAt = null;
    }

    Todo
      .findByIdAndUpdate(id, { $set: body }, { new: true })
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  });


module.exports = router;
