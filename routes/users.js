const userRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const {
  findUsers, updateUser, updateUserAvatar, login, findUserById, findMe,
} = require('../controllers/user-controllers');

/* Поиск всех пользователей */
userRouter.get('/', (req, res) => {
  findUsers(req, res);
});
/* Поиск  авторизованного пользователя */
userRouter.get('/me', (req, res) => {
  findMe(req, res);
});
/* Поиск конкретного пользователя по ID */
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), (req, res) => {
  findUserById(req, res);
});

/* Обновление информации о пользователе */
userRouter.patch('/me', (req, res) => {
  updateUser(req, res);
});
/* Обновление аватара пользователя */
userRouter.patch('/me/avatar', (req, res) => {
  updateUserAvatar(req, res);
});
userRouter.post('/signin', (req, res) => {
  login(req, res);
});
userRouter.use(errors());

module.exports = userRouter;
