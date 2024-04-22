const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  /**
   * To complete our register functionality, let's learn about schema
   * instance methods in mongoose, look the docs navigate to Schema
   * and inside Schema navigate to instance methods and essentially
   * what happens every document we create, we can have functions on
   * them, so these are gonna be instances of course our schema and the
   * way we setup those functions, we go with schema name then methods
   * and then whatever function you want, so essentially once i create
   * that user over here in the register controller that user will
   * have a function, you can probably already guess that will create
   * a function that just generates that token and of course in that
   * function we'll pretty much have the same token code and therefore
   * we won't have to bother with that in the actual controller in
   * the register controller. So let's start and go inside the User
   * Schema folder and lets just go with UserSchema.methods.yourFunction
   * and this method will always point to our document.
   *
   */
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
