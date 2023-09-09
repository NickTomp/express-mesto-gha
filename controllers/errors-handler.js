const INVALID_DATA_ERROR_CODE = 400;
const DEFAULT_ERROR_CODE = 500;

function errorsHandler(err, res) {
  if (err.name === 'CastError') {
    res.status(INVALID_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(INVALID_DATA_ERROR_CODE).send({ message: 'Данные не прошли валидацию' });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка: ${err}` });
}

module.exports = errorsHandler;
