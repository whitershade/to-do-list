const { ObjectID } = require('mongodb');


module.exports = (req, res, next) => {
  const { params: { id } } = req;

  if (!ObjectID.isValid(id)) {
    return res.status(418).json({ message: 'ID should be valid' });
  }

  next();
};
