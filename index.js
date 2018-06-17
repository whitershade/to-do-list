const express = require('express');
const { ObjectID } = require('mongodb');
const { pick } = require('lodash');

require('./config');
const Todo = require('./models/todo');
// const User = require('./models/user');


const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
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
});

app.get('/todos', (req, res) => {
  Todo
    .find()
    .then((todos) => {
      res.send({ todos });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  const { params: { id } } = req;

  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', (req, res) => {
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
});

app.patch('/todos/:id', (req, res) => {
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

app.listen(port, () => {
  global.console.log(`Started at port ${port}`);
});


module.exports = app;
