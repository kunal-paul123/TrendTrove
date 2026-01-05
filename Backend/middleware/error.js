const ExpressError = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ExpressError(400, message);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(
      err.keyValue
    )} entered`;
    err = new ExpressError(400, message);
  }

  //wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid, Try again";
    err = new ExpressError(400, message);
  }

  //Jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is expired, Try again";
    err = new ExpressError(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
