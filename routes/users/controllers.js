const { pick } = require('lodash');
const Model = require('../../models/user');


const controllers = {
  getItems: (req, res) => {
    const token = req.header('x-auth');

    Model.findByToken(token);

    Model
      .findByToken(token)
      .then((user) => {
        if (!user) Promise.reject();

        res.send(user);
      })
      .catch((e) => {
        res.status(401).send(e);
      });
  },
  getItem: (req, res) => {
    Model
      .findById(req.params.id)
      .then((item) => {
        if (!item) return res.status(404).send();

        res.send({ item });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  createItem: (req, res) => {
    const body = pick(req.body, ['email', 'password']);
    const User = new Model(body);

    User
      .save()
      .then(user => user.generateAuthToken())
      .then((token) => {
        console.log(User);
        res.header('x-auth', token).send(User);
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send(e);
      });
  },
  deleteItem: (req, res) => {
    Model
      .findByIdAndRemove(req.params.id)
      .then((item) => {
        if (!item) return res.status(404).send();

        res.send({ item });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  updateItems: (req, res) => {
    const body = pick(req.body, ['text', 'completed', 'completedAt']);

    Model
      .findByIdAndUpdate(req.params.id, { $set: body }, { new: true })
      .then((item) => {
        if (!item) return res.status(404).send();

        res.send({ item });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
};


module.exports = { ...controllers };
