const cardRouter = require('express').Router();

const {
  findCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/card-controllers');

/* Поиск всех карточек */
cardRouter.get('/', (req, res) => {
  findCards(req, res);
});
/* Создание карточки */
cardRouter.post('/', (req, res) => {
  createCard(req, res);
});
/* Удаление конкретной карточки */
cardRouter.delete('/:cardId', (req, res) => {
  deleteCard(req, res);
});
/* Постановка лайка на карточку */
cardRouter.put('/:cardId/likes', (req, res) => {
  likeCard(req, res);
});
/* Снятие лайка с карточки */
cardRouter.delete('/:cardId/likes', (req, res) => {
  disLikeCard(req, res);
});

module.exports = cardRouter;
