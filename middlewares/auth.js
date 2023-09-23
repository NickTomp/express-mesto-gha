const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorized-err');
const { randomString } = require('../controllers/user-controllers');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnathorizedError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, randomString);
  } catch (error) {
    next(new UnathorizedError('Необходима авторизация'));
  }
  req.user = payload._id;
  next();
};
