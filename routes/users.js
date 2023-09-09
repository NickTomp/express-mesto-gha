const userRouter = require('express').Router();

const {
  findUsers, findUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user-controllers');

/* Поиск всех пользователей */
userRouter.get('/', (req, res) => {
  findUsers(req, res);
});
/* Поиск конкретного пользователя по ID */
userRouter.get('/:id', (req, res) => {
  findUserById(req, res);
});
/* Создание пользователя */
userRouter.post('/', (req, res) => {
  createUser(req, res);
});
/* Обновление информации о пользователе */
userRouter.patch('/me', (req, res) => {
  updateUser(req, res);
});
/* Обновление аватара пользователя */
userRouter.patch('/me/avatar', (req, res) => {
  updateUserAvatar(req, res);
});

module.exports = userRouter;
