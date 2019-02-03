const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  loginName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  surname: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
});

function validateUser(user) {
  const schema = {
    loginName: Joi.string()
      .min(6)
      .max(100)
      .required(),
    name: Joi.string()
      .max(50)
      .required(),
    surname: Joi.string()
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required(),
  };

  return Joi.validate(user, schema);
}
const userModel = mongoose.model('User', userSchema);

exports.User = userModel;
exports.validate = validateUser;
