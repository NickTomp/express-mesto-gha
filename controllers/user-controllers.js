const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorsHandler = require('./errors-handler');
const user = require('../models/user');

const NOT_FOUND_ERROR_CODE = 404;
const randomString = 'b002d700beba35a4d4b5d89e99041aab';

function findUsers(req, res) {
  user.find({})
    .then((resultUser) => res.status(200).send(resultUser))
    .catch((err) => {
      errorsHandler(err, res);
    });
}
function findMe(req, res) {
  user.findById(req.user)
    .then((resultUser) => {
      if (resultUser === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(200).send(resultUser);
    })
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!validator.isEmail(email)) {
    Promise.reject(new Error())
      .catch((err) => {
        const error = err;
        error.name = 'CastError';
        errorsHandler(error, res);
      });
    return;
  }
  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((resultUser) => res.status(200).send({ data: resultUser }))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function updateUser(req, res) {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((resultUser) => res.status(200).send({ data: resultUser }))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((resultUser) => res.status(200).send({ data: resultUser }))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function login(req, res) {
  const { email, password } = req.body;
  user.findOne({ email }).select('+password')
    .then((resultUser) => {
      if (!resultUser) {
        return Promise.reject(new Error('incorrect'))
          .catch((err) => {
            errorsHandler(err, res);
          });
      }
      bcrypt.compare(password, resultUser.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('incorrect'))
              .catch((err) => {
                errorsHandler(err, res);
              });
          }
          const token = jwt.sign({ _id: resultUser._id }, randomString);
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          }).end();
          return true;
        });
      return true;
    })
    .catch((err) => {
      errorsHandler(err, res);
    });
}
module.exports = {
  findUsers, createUser, updateUser, updateUserAvatar, login, randomString, findMe,
};
