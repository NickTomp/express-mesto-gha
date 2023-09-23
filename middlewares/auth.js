const jwt = require('jsonwebtoken');
const PermissionError = require('../errors/permission-err');
const { randomString } = require('../controllers/user-controllers');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new PermissionError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, randomString);
  } catch (error) {
    next(new PermissionError('Необходима авторизация'));
  }
  req.user = payload._id;
  next();
};
