const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  let customError = {
    // ***** setDefault ****
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  // ***** Cast Error (If we type wrong length of id then it should occur like id length is 11 and we pass 12) *****
  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'ValidationError') {
    // ***** Input Fields Validation Error *****
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    // ***** Duplicate email error *****
    console.log('happens');
    customError.msg = `Duplicate value entered for  ${Object.keys(
      err.keyValue
    )} field, please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;
