const { ObjectID } = require('mongodb');


const middlewares = {
  checkIfTodoCompleted: (req, res, next) => {
    if (req.body.completed) {
      req.body.completedAt = new Date().getTime();
    } else {
      req.body.completedAt = null;
    }

    next();
  },

  checkIsIdValid: (req, res, next) => {
    const { params: { id } } = req;

    if (!ObjectID.isValid(id)) {
      return res.status(418).json({ message: 'ID should be valid' });
    }

    next();
  },
};


module.exports = { ...middlewares };
