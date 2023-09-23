const userRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const { urlRegex } = require('../constants/urlRegex');
const {
  findUsers, updateUser, updateUserAvatar, findUserById, findMe,
} = require('../controllers/user-controllers');

/* Поиск всех пользователей */
userRouter.get('/', (req, res, next) => {
  findUsers(req, res, next);
});
/* Поиск  авторизованного пользователя */
userRouter.get('/me', (req, res, next) => {
  findMe(req, res, next);
});
/* Поиск конкретного пользователя по ID */
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), (req, res, next) => {
  findUserById(req, res, next);
});
/* Обновление информации о пользователе */
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), (req, res, next) => {
  updateUser(req, res, next);
});
/* Обновление аватара пользователя */
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex),
  }),
}), (req, res, next) => {
  updateUserAvatar(req, res, next);
});
userRouter.use(errors());

module.exports = userRouter;
