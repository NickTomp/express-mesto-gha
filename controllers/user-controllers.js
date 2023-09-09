const errorsHandler = require('./errors-handler');
const user = require('../models/user');

const NOT_FOUND_ERROR_CODE = 404;

function findUsers(req, res) {
  user.find({})
    .then((resultUser) => res.status(200).send(resultUser))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function findUserById(req, res) {
  user.findById(req.params.id)
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
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((resultUser) => res.status(200).send({ data: resultUser }))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function updateUser(req, res) {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, {
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
  user.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((resultUser) => res.status(200).send({ data: resultUser }))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

module.exports = {
  findUsers, findUserById, createUser, updateUser, updateUserAvatar,
};
