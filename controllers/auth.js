const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const register = async (req, res) => {
  /**
   * If we take a look at our controller after implementing hashing password
   * it's getting somewhat busy, so if we'll keep on adding more functionality
   * and just keep jamming the code in the controller, eventually it's going
   * to get bloated and way harder to manage. Now what's the solution, you might
   * ask?, We'll another set of middleware only in this case we're talking about
   * the mongoose middleware. But just keep one thing in mind, the end result is
   * going to be exactly the same. It's just the hashing logic will be stored
   * nicely in a separate place.
   *
   * W're looking for middleware and of course you can read it from documentation.
   * Middleware (also called pre and post hooks) are functions which are passed
   * control during execution of asynchronous functions. Middleware is specified
   * on the schema level and is useful for writing plugins.
   *
   * Now we are moving our password hashing logic inside a User schema folder
   * and use middleware function to implement the logic inside that function.
   *
   * Essentially we are looking for pre and more specifically pre save middleware
   * and the way we set it up, we have the schema in our case, of course that is
   * going to be our user schema then we go with pre so that's the syntax and
   * we are looking for save, so before we save the document and then in the
   * callback function, this is where we can access the properties in a document
   * and do some exciting stuff and since this is a middleware then we just go
   * with next but in mongoose 5.x instead of calling next manually you can
   * use a function that returns a promise.
   *
   */

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
