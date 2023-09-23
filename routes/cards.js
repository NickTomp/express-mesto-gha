const cardRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { urlRegex } = require('../constants/urlRegex');
const {
  findCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/card-controllers');

/* Поиск всех карточек */
cardRouter.get('/', (req, res, next) => {
  findCards(req, res, next);
});
/* Создание карточки */
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegex),
  }),
}), (req, res, next) => {
  createCard(req, res, next);
});
/* Удаление конкретной карточки */
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), (req, res, next) => {
  deleteCard(req, res, next);
});
/* Постановка лайка на карточку */
cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), (req, res, next) => {
  likeCard(req, res, next);
});
/* Снятие лайка с карточки */
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), (req, res, next) => {
  disLikeCard(req, res, next);
});
cardRouter.use(errors());

module.exports = cardRouter;
