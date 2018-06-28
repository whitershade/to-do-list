const { pick } = require('lodash');
const Model = require('./model');


const controllers = {
  getItems: (req, res) => {
    Model
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
  getItem: (req, res) => {
    Model
      .findById(req.params.id)
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  createItem: (req, res) => {
    const newItem = new Model({
      text: req.body.text,
    });

    newItem
      .save()
      .then((todo) => {
        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  deleteItem: (req, res) => {
    Model
      .findByIdAndRemove(req.params.id)
      .then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  updateItem: (req, res) => {
    const body = pick(req.body, ['text', 'completed', 'completedAt']);

    Model
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
