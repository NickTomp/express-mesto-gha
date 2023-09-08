const notFoundRouter = require('express').Router();
/*Функция универсального ответа */
function notFoundAnswer (res) {
  res.status(404).send({ message: `Запрашиваемая страница не найдена` })
};
/*Обработка несуществующего пути */
notFoundRouter.get('/', (req, res) => {
  notFoundAnswer (res)
});
notFoundRouter.post('/', (req, res) => {
  notFoundAnswer (res)
});
notFoundRouter.put('/', (req, res) => {
  notFoundAnswer (res)
});
notFoundRouter.patch('/', (req, res) => {
  notFoundAnswer (res)
});
notFoundRouter.delete('/', (req, res) => {
  notFoundAnswer (res)
});
module.exports = notFoundRouter;