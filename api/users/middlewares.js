const User = require('./model');


const middlewares = {
  authenticate: (req, res, next) => {
    const token = req.header('x-auth');

    User
      .findByToken(token)
      .then((user) => {
        if (!user) Promise.reject();

        req.user = user;
        req.token = token;

        next();
      })
      .catch(() => {
        res.status(401).send();
      });
  },
};


module.exports = { ...middlewares };
