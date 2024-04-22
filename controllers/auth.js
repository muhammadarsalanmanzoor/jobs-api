const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  /**
   * Salt:
   * What is salt?
   * Which essentially just means random bytes and we do that by running the
   * method genSalt and in there we provide a number of rounds, so how many
   * random bytes will get and of course the bigger the number, the more
   * random bytes will get and of course that also means that the more secure
   * our password is going to be
   */

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const requestBody = {
    name,
    email,
    password: hashPassword,
  };

  const user = await User.create({ ...requestBody });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
