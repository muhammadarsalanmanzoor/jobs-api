const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ***** If authorization is not provided and not starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid!');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    // ***** attach the user to the job route *****
    next();

    // ***** If token is expired then our catch block will run *****
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid!');
  }
};

module.exports = authenticationMiddleware;
