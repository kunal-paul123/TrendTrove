const instance = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");

const frontend_url = process.env.FRONTEND_URL;

//create razorpay order
exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), //amount in paise (₹500 = 50000 paise)
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//create paymentverification
exports.paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.redirect(
      `${frontend_url}/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
