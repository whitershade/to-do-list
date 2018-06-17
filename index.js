const express = require('express');
const { ObjectID } = require('mongodb');

const Todo = require('./models/todo');
// const User = require('./models/user');


const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo
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

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  global.console.log(`Started at port ${port}`);
});


module.exports = app;
