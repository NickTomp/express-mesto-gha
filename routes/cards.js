const cardRouter = require('express').Router();
const card = require('../models/card');
const mongoose = require('mongoose');
/*Универсальный обработчик ошибок*/
function cardErrorsHandler(err, res) {
  if (err.name === "CastError") {
    res.status(404).send({ message: `Запрашиваемая карточка не найдена` })
    return;
  }
  if (err.name === "ValidationError") {
    res.status(400).send({ message: `Переданы некорректные данные` })
    return;
  }
  res.status(500).send({ message: `Произошла ошибка: ${err}` })
}
/*Поиск всех карточек*/
cardRouter.get('/', (req, res) => {
  card.find({})
    .then(card => res.status(200).send(card))
    .catch((err) => {
      cardErrorsHandler(err, res)
    });
});
/*Создание карточки*/
cardRouter.post('/', (req, res) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => {
      cardErrorsHandler(err, res)
    });
});
/*Удаление конкретной карточки*/
cardRouter.delete('/:cardId', (req, res) => {
  if (!mongoose.isValidObjectId(req.params.cardId)) {
    res.status(400).send({ message: `Переданы некорректные данные` })
    return;
  }
  card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: `Запрашиваемая карточка не найдена` })
        return;
      }
      res.status(200).send(card)
    })
    .catch((err) => {
      cardErrorsHandler(err, res)
    });
});
/*Постановка лайка на карточку*/
cardRouter.put('/:cardId/likes', (req, res) => {
  if (!mongoose.isValidObjectId(req.params.cardId)) {
    res.status(400).send({ message: `Переданы некорректные данные` })
    return;
  }
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (card === null) {
      res.status(404).send({ message: `Запрашиваемая карточка не найдена` })
      return;
    }
    res.status(200).send(card)
  })
    .catch((err) => {
      cardErrorsHandler(err, res)
    });
});
/*Снятие лайка с карточки*/
cardRouter.delete('/:cardId/likes', (req, res) => {
  if (!mongoose.isValidObjectId(req.params.cardId)) {
    res.status(400).send({ message: `Переданы некорректные данные` })
    return;
  }
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (card === null) {
      res.status(404).send({ message: `Запрашиваемая карточка не найдена` })
      return;
    }
    res.status(200).send(card)
  })
    .catch((err) => {
      cardErrorsHandler(err, res)
    });
});
/*Обработка несуществующего пути */
cardRouter.get('*', (req, res) => {
  res.status(404).send({ message: `Запрашиваемая страница не найдена` })
})

module.exports = cardRouter;