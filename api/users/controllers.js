const { pick } = require('lodash');
const UserModel = require('./model');


const controllers = {
  getMe: (req, res) => {
    const token = req.header('x-auth');

    UserModel.findByToken(token);

    UserModel
      .findByToken(token)
      .then((user) => {
        if (!user) Promise.reject();

        res.send(user);
      })
      .catch((e) => {
        res.status(401).send(e);
      });
  },

  login: (req, res) => {
    const body = pick(req.body, ['email', 'password']);

    UserModel
      .findByCredentials(body.email, body.password)
      .then((user) => {
        user
          .generateAuthToken()
          .then((token) => {
            res.header('x-auth', token).send(user);
          });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  createItem: (req, res) => {
    const body = pick(req.body, ['email', 'password']);
    const User = new UserModel(body);

    User
      .save()
      .then(user =>
        user
          .generateAuthToken()
          .then((token) => {
            res.header('x-auth', token).send(user);
          }))
      .catch((e) => {
        res.status(400).send(e);
      });
  },
  deleteItem: (req, res) => {
    UserModel
      .findByIdAndRemove(req.params.id)
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
