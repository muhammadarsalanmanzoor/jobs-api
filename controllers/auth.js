const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // ***** Checking if email or password is send into the request body or not *****
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  // ***** Checking if user finds in our db or not *****
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // ***** Compare password is matched or not *****
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
