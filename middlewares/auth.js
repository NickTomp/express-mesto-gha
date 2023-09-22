const jwt = require('jsonwebtoken');
const errorsHandler = require('../controllers/errors-handler');
const { randomString } = require('../controllers/user-controllers');

module.exports = (req, res, next) => {
  const err = new Error('unathorized');
  if (!req.cookies.jwt) {
    errorsHandler(err, res);
    return;
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, randomString);
  } catch (error) {
    errorsHandler(err, res);
    return;
  }
  req.user = payload._id;
  next();
};
