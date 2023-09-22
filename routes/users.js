const userRouter = require('express').Router();

const {
  findUsers, updateUser, updateUserAvatar, login, findMe,
} = require('../controllers/user-controllers');

/* Поиск всех пользователей */
userRouter.get('/', (req, res) => {
  findUsers(req, res);
});
/* Поиск  авторизованного пользователя */
userRouter.get('/me', (req, res) => {
  findMe(req, res);
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

module.exports = userRouter;
