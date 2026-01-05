import React from "react";
import "./cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../Actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  return (
    <>
      {cartItems?.length == 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product In Your Cart</Typography>
          <NavLink to="/products">View Products</NavLink>
        </div>
      ) : (
        <>
          <MetaData title="Cart" />
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItem}
                    />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input readOnly type="number" value={item.quantity} />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`₹${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                );
              })}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={() => checkOutHandler()}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
