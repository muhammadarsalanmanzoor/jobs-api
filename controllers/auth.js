const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

/**
 *
 * JWT SECRET AND JWT LIFETIME
 * - So remember in our options we go with expires in and as far as default setup
 *   so if we just provide a number this is going to be in seconds, now if we
 *   provide a string, then we need to make sure that we add time units, whether
 *   at the days hours and all that otherwise it's going to be interpreted as
 *   milliseconds so we put something like this "120" then it should be "120ms".
 *
 * - As far as the JWT secret string, the more proper setup is generating a some
 *   kind of more secure key and i prefer using `allkeysgenerator.com` and look
 *   for encryption key tab and more specifically looking for 256bit one and
 *   then of course, you can get the value and just take that value and stick it
 *   in the .env file
 *
 *
 */

const register = async (req, res) => {
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
