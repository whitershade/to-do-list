const { pick } = require('lodash');
const Model = require('../../models/user');


const controllers = {
  getItems: (req, res) => {
    Model
      .find()
      .then((itemsResponse) => {
        const items = {};

        itemsResponse.forEach((item) => {
          items[item._id] = item;
        });

        res.send({ items });
      })
      .catch((e) => {
        res.status(400).send(e);
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
    const user = new Model(body);

    user
      .save()
      .then(item => item.generateAuthToken())
      .then((token) => {
        res.header('x-auth', token).send(user);
      })
      .catch((e) => {
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
