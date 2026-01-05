const dotenv = require("dotenv");
const Razorpay = require("razorpay");

dotenv.config({ path: "Backend/config/config.env" });

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports = instance;
