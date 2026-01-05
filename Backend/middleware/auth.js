const User = require("../models/userModel");
const ExpressError = require("../utils/errorHandler");
const wrapAsync = require("../utils/wrapAsync");
const jwttoken = require("jsonwebtoken");

exports.isAuthenticatedUser = wrapAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ExpressError(401, "Please login to access this resource"));
  }

  const decodedData = jwttoken.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ExpressError(
          403,
          `Role: ${req.user.role} is not allowed to access this resouce`
        )
      );
    }

    next();
  };
};
