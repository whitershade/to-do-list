const { pick } = require('lodash');
const Todo = require('../../models/todo');


const controllers = {
  getTodos: (req, res) => {
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
  },
  getTodo: (req, res) => {
    Todo
      .findById(req.params.id)
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  createTodo: (req, res) => {
    const newTodo = new Todo({ text: req.body.text });

    newTodo
      .save()
      .then((todo) => {
        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  deleteTodo: (req, res) => {
    Todo
      .findByIdAndRemove(req.params.id)
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  updateTodo: (req, res) => {
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
  },
};


module.exports = { ...controllers };
