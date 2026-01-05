import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MetaData from "../layout/MetaData";
import { clearErrors, createOrder } from "../../Actions/orderAction";
import toast from "react-hot-toast";
import CheckoutSteps from "./CheckoutSteps";
import "./PaymentPage.css";

function PaymentPage() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePayment = async () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    // setPaymentLoading(true);

    const {
      data: { key },
    } = await axios.get(`${backendURL}/api/v1/getkey`, {
      withCredentials: true,
    });

    const {
      data: { order },
    } = await axios.post(
      `${backendURL}/api/v1/payment/order`,
      {
        amount: orderInfo.totalPrice,
      },
      {
        withCredentials: true, //Send cookies (JWT) with request
      }
    );

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Ecommerce",
      description: "Order Payment",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url:
        `${backendURL}/api/v1/paymentverification`,
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: shippingInfo.phoneNo,
      },
      notes: {
        address: shippingInfo.address,
      },
      theme: {
        color: "#3399cc",
      },
      handler: function (response) {
        const order = {
          shippingInfo,
          orderItems: cartItems,
          itemsPrice: orderInfo.subtotal,
          taxPrice: orderInfo.tax,
          shippingPrice: orderInfo.shippingCharges,
          totalPrice: orderInfo.totalPrice,
          pincode: shippingInfo.pincode,
          paymentInfo: {
            id: response.razorpay_payment_id,
            status: "Paid",
          },
        };

        dispatch(createOrder(order));

        navigate(`/paymentsuccess?reference=${response.razorpay_payment_id}`);
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <CheckoutSteps activeStep={2} />
      <div className="paymentpage">
        <MetaData title="Payment" />
        <button className="payment" onClick={handlePayment}>
          Pay now
        </button>
      </div>
    </>
  );
}

export default PaymentPage;
