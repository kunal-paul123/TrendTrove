import React from "react";
import "./cartItemCard.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import useSignedImage from "../../hooks/useSignedImage";

function CartItemCard({ item, deleteCartItems }) {
  const { imageUrl } = useSignedImage(item.image);

  return (
    <div className="CartItemCard">
      <img src={imageUrl} alt="png" />
      <div>
        <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>
          <DeleteIcon />
        </p>
      </div>
    </div>
  );
}

export default CartItemCard;
