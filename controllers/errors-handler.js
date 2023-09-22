const INVALID_DATA_ERROR_CODE = 400;
const UNATHORIZED_ERROR_CODE = 401;
const PERMISSION_ERROR_CODE = 403;
const DUPLICATE_ERROR_CODE = 409;
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
  if (err.message === 'incorrect') {
    res.status(UNATHORIZED_ERROR_CODE).send({ message: 'Неправильные почта или пароль' });
    return;
  }
  if (err.message === 'unathorized') {
    res.status(UNATHORIZED_ERROR_CODE).send({ message: 'Необходима авторизация' });
    return;
  }
  if (err.message === 'permission') {
    res.status(PERMISSION_ERROR_CODE).send({ message: 'Недостаточно прав доступа' });
    return;
  }
  if (err.code === 11000) {
    res.status(DUPLICATE_ERROR_CODE).send({ message: 'Такой пользователь уже зарегистрирован' });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка: ${err}` });
}

module.exports = errorsHandler;
