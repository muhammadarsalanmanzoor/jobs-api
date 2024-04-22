const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please provide valid email',
    ],
    // ***** it just create a unique index, so for example if i'm trying to save a
    // user but there is already a email and use, then i'll get the duplicate error
    // message
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
    minLength: 6,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;