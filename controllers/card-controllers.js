const errorsHandler = require('./errors-handler');
const card = require('../models/card');

const NOT_FOUND_ERROR_CODE = 404;

function findCards(req, res) {
  card.find({})
    .then((resultCard) => res.status(200).send(resultCard))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((resultCard) => res.status(200).send({ data: resultCard }))
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function deleteCard(req, res) {
  card.findByIdAndRemove(req.params.cardId)
    .then((resultCard) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(200).send(resultCard);
    })
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function likeCard(req, res) {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((resultCard) => {
      if (card === null) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(200).send(resultCard);
    })
    .catch((err) => {
      errorsHandler(err, res);
    });
}

function disLikeCard(req, res) {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((resultCard) => {
      if (resultCard === null) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(200).send(resultCard);
    })
    .catch((err) => {
      errorsHandler(err, res);
    });
}

module.exports = {
  findCards, createCard, deleteCard, likeCard, disLikeCard,
};
