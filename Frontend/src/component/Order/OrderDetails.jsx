import React, { useEffect } from "react";
import "./orderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, getOrderDeatils } from "../../Actions/orderAction";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Typography from "@mui/material/Typography";

function OrderDetails() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDeatils(id));
  }, [dispatch, toast, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />

          <div className="OrderDetailsPage">
            <div className="OrderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="OrderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user?.name}</span>
                </div>
                <div>
                  <p>Phone</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state}, ${order.shippingInfo.pincode},${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="OrderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo && order.paymentInfo.status === "Paid"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo && order.paymentInfo.status === "Paid"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>₹{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography className="orderStatus">Order Status</Typography>
              <div className="OrderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <NavLink to={`/product/${item.product}`}>
                        {item.name}
                      </NavLink>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderDetails;
