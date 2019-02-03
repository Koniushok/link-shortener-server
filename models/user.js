const mongoose = require('mongoose');

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

const userModel = mongoose.model('User', userSchema);

exports.User = userModel;
