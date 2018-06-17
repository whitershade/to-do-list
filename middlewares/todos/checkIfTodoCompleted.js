module.exports = (req, res, next) => {
  if (req.body.completed) {
    req.body.completedAt = new Date().getTime();
  } else {
    req.body.completedAt = null;
  }

  next();
};
