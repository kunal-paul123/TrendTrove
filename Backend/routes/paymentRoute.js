const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createOrder,
  paymentVerification,
} = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment/order").post(isAuthenticatedUser, createOrder);

router.route("/paymentverification").post(paymentVerification);

module.exports = router;
