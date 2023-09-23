const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const validator = require('validator');
const urlRegex = require('../constants/urlRegex');

const avatarValidator = validate({
  validator: 'matches',
  arguments: urlRegex,
  message: 'Avatar should be a link',
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: avatarValidator,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Email validation failed',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});
module.exports = mongoose.model('user', userSchema);
