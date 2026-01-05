const ExpressError = require("../utils/errorHandler");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register user
exports.register = wrapAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login user
exports.login = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user has given password and email both
  if (!email || !password) {
    return next(new ExpressError(400, "Please Enter Email & Password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ExpressError(401, "Invaild email or password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ExpressError(401, "Invaild email or password"));
  }

  sendToken(user, 200, res);
});

//Logout user
exports.logout = wrapAsync(async (req, res, next) => {
  // Clear the cookie by setting it to null and expiring it immediately
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password
exports.forgotPassword = wrapAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  // console.log(resetPasswordUrl);

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requestes this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user?.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user?.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ExpressError(500, error.message));
  }
});

//reset password
exports.resetPassword = wrapAsync(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ExpressError(
        400,
        "Reset password token is invalid or has been expired"
      )
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ExpressError(400, "Password does not matched"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update user password
exports.updateUserPassword = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ExpressError(400, "Old password is incorrect"));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ExpressError(400, "Password does not match"));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update profile
exports.updateUserProfile = wrapAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users (admin)
exports.getAllUsers = wrapAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user (admin)
exports.getSingleUser = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ExpressError(400, `User does not exist with Id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user role (Admin)
exports.updateUserRole = wrapAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ExpressError(`User does not exist with Id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
  });
});

//Delete user (Admin)
exports.deleteUser = wrapAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ExpressError(`User does not exist with Id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
