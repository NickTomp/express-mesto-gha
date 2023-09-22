const cardRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const {
  findCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/card-controllers');

/* Поиск всех карточек */
cardRouter.get('/', (req, res) => {
  findCards(req, res);
});
/* Создание карточки */
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }),
}), (req, res) => {
  createCard(req, res);
});
/* Удаление конкретной карточки */
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res) => {
  deleteCard(req, res);
});
/* Постановка лайка на карточку */
cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res) => {
  likeCard(req, res);
});
/* Снятие лайка с карточки */
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res) => {
  disLikeCard(req, res);
});
cardRouter.use(errors());

module.exports = cardRouter;
