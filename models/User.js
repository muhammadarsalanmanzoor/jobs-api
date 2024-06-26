const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// ***** this code is much cleaner and nicer to work *****
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ***** mongoose instance method, that is available inside our document *****
UserSchema.methods.createJWT = function () {
  // ***** In this function we can also access the document *****
  // ***** this points to the document *****
  // ***** Now i simply wanna call this function, inside our register controller *****
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    }
  );
};

// ***** check or compare password method *****
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
