const notFoundRouter = require('express').Router();
/* Функция универсального ответа */
function notFoundAnswer(res) {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
}
/* Обработка несуществующего пути */
notFoundRouter.use('/', (req, res) => {
  notFoundAnswer(res);
});
module.exports = notFoundRouter;
