const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notfound');
const errorsHandler = require('./middlewares/errors-handler');
const auth = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/user-controllers');
const { urlRegex } = require('./constants/urlRegex');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
  }),
}), createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', notFoundRouter);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
