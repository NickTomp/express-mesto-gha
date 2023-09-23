const card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const PermissionError = require('../errors/permission-err');

function findCards(req, res, next) {
  card.find({})
    .then((resultCard) => res.status(200).send(resultCard))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user })
    .then((resultCard) => res.status(200).send({ data: resultCard }))
    .catch(next);
}

function deleteCard(req, res, next) {
  card.findById(req.params.cardId)
    .then((resultCard) => {
      if (resultCard === null) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (req.user !== resultCard.owner._id.toString()) {
        throw new PermissionError('Недостаточно прав доступа');
      }
      card.findByIdAndRemove(req.params.cardId)
        .then((Card) => {
          res.status(200).send(Card);
        });
    })
    .catch(next);
}

function likeCard(req, res, next) {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user } },
    { new: true },
  )
    .then((resultCard) => {
      if (resultCard === null) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      res.status(200).send(resultCard);
    })
    .catch(next);
}

function disLikeCard(req, res, next) {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user } },
    { new: true },
  )
    .then((resultCard) => {
      if (resultCard === null) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      res.status(200).send(resultCard);
    })
    .catch(next);
}

module.exports = {
  findCards, createCard, deleteCard, likeCard, disLikeCard,
};
