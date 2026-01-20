import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./ProductCard.css";
import { useEffect, useState } from "react";

function ProductCard(product) {
  const options = {
    size: "medium",
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        if (!product.images?.key) return;

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/image/signed-url/?key=${product.images?.key}`);
        const data = await res.json();
        setImageUrl(data.url);
      } catch (error) {
        console.log("failed to fetch signed url: ", error);
      }
    }
    fetchSignedUrl();
  }, [product.images?.key]);

  return (
    <NavLink className="productCard" to={`/product/${product._id}`}>
      {imageUrl && (
        <img src={imageUrl} alt={product.name} />
      )}
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span>({product.numOfReviews})</span>
      </div>
      <span className="price">{`₹${product.price}`}</span>
    </NavLink>
  );
}

export default ProductCard;
