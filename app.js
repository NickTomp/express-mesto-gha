const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64f9a1814aaa70fb1ae3ed29'
  };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})