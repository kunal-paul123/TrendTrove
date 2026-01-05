import React, { useEffect } from "react";
import "./myOrders.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import { NavLink } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

function MyOrders() {
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, toast, error]);

  return (
    <>
      <MetaData title={`${user?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <p className="myOrdersHeading">Your Orders</p>

          <div className="ordersContainer">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="orderCard">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Name:</strong> {order.orderItems[0]?.name}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Items Qty:</strong> {order.orderItems?.length}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{order.totalPrice}
                  </p>
                  <NavLink to={`/order/${order._id}`} className="orderLink">
                    <LaunchIcon /> View Details
                  </NavLink>
                </div>
              ))
            ) : (
              <p className="no-orders">No orders found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrders;
