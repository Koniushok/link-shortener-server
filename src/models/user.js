/* eslint-disable func-names */
// @flow
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

export type User = {
  loginName: string,
  name: string,
  surname: string,
  name: string,
};
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

userSchema.methods.getToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('jwtKey'));
  return token;
};

function validateUser(user: User) {
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