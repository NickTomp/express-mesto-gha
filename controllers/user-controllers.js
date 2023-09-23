const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const DuplicateError = require('../errors/duplicate-err');
const UnathorizedError = require('../errors/unathorized-err');
const BadRequestError = require('../errors/bad-request-err');
const user = require('../models/user');

const randomString = 'b002d700beba35a4d4b5d89e99041aab';

function findUsers(req, res, next) {
  user.find({})
    .then((resultUser) => res.status(200).send(resultUser))
    .catch(next);
}
function findMe(req, res, next) {
  user.findById(req.user)
    .then((resultUser) => {
      if (resultUser === null) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send(resultUser);
    })
    .catch(next);
}
function findUserById(req, res, next) {
  user.findById(req.params.id)
    .then((resultUser) => {
      if (resultUser === null) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send(resultUser);
    })
    .catch(next);
}
function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((resultUser) => res.status(200).send({
      name: resultUser.name,
      about: resultUser.about,
      avatar: resultUser.avatar,
      email: resultUser.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new DuplicateError('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((resultUser) => res.status(200).send({ data: resultUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при обновлении информации о пользователе'));
      } else {
        next(err);
      }
    });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((resultUser) => res.status(200).send({ data: resultUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  user.findOne({ email }).select('+password')
    .then((resultUser) => {
      if (!resultUser) {
        return Promise.reject(new UnathorizedError('Неверный логин или пароль'))
          .catch(next);
      }
      bcrypt.compare(password, resultUser.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError('Неверный логин или пароль'))
              .catch(next);
          }
          const token = jwt.sign({ _id: resultUser._id }, randomString);
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          }).send({ message: 'login successful' });
          return true;
        });
      return true;
    })
    .catch(next);
}
module.exports = {
  findUsers, createUser, updateUser, updateUserAvatar, login, findUserById, randomString, findMe,
};
