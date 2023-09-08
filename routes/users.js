const userRouter = require('express').Router();
const user = require('../models/user');
const mongoose = require('mongoose');
/*Универсальный обработчик ошибок*/
function userErrorsHandler(err, res) {
  if (err.name === "CastError") {
    res.status(404).send({ message: `Запрашиваемый пользователь не найден` })
    return;
  }
  if (err.name === "ValidationError") {
    res.status(400).send({ message: `Переданы некорректные данные` })
    return;
  }
  res.status(500).send({ message: `Произошла ошибка: ${err}` })
}
/*Поиск всех пользователей*/
userRouter.get('/', (req, res) => {
  user.find({})
  .then(user => res.status(200).send(user))
  .catch((err) => {
    userErrorsHandler(err, res)
 });
});
/*Поиск конкретного пользователя по ID*/
userRouter.get('/:id', (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send({ message: `Переданы некорректные данные`})
    return;
  }
  user.findById(req.params.id)
  .then((user) => {
    if (user === null) {
      res.status(404).send({ message: `Запрашиваемый пользователь не найден`})
      return;
    }
    res.status(200).send(user)
  })
  .catch((err) => {
    userErrorsHandler(err, res)
 });
});
/*Создание пользователя*/
userRouter.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
  .then(user => res.status(200).send({ data: user }))
  .catch((err) => {
    userErrorsHandler(err, res)
 });
});
/*Обновление информации о пользователе*/
userRouter.patch('/me', (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
})
  .then(user => res.status(200).send({ data: user }))
  .catch((err) => {
    userErrorsHandler(err, res)
 });
});
/*Обновление аватара пользователя*/
userRouter.patch('/me/avatar', (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
})
  .then(user => res.status(200).send({ data: user }))
  .catch((err) => {
   userErrorsHandler(err, res)
 });
});

module.exports = userRouter;