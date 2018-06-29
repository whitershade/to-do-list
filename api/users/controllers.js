const { pick } = require('lodash');
const UserModel = require('./model');


const controllers = {
  getMe: (req, res) => {
    const token = req.header('x-auth');

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
    req.user
      .removeToken(req.token)
      .then(res.status(200).send())
      .catch(() => {
        res.status(400).send();
      });
  },
};


module.exports = { ...controllers };
