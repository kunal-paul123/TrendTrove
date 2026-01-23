import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../Actions/productAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../Constants/productConstants";
import useSignedImage from "../../hooks/useSignedImage";
import uploadTos3 from "../../../helper/uploadTos3";

function Updateproduct() {
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteAndUpdateProduct);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [images, setImages] = useState(null);
  const [oldImages, setOldImages] = useState(null);
  const [imagesPreview, setImagesPreview] = useState(null);

  let categories = [
    "Mobile",
    "Laptop",
    "FootWear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphones",
  ];

  const { imageUrl } = useSignedImage(product.images?.key);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(imageUrl);
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [error, isUpdated, navigate, toast, dispatch, id, product, updateError]);

  const updateProductHandler = async (e) => {
    e.preventDefault();

    const uploadImage = await uploadTos3(images);

    const productData = {
      name, price, description, category, stock, images: uploadImage,
    };

    dispatch(updateProduct(id, productData));
  };

  const updateProductImagesChange = (e) => {
    const file = e.target.files[0];

    setImages(file);
    setImagesPreview(null);
    setOldImages(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagesPreview(reader.result);
      }
    }
    reader.readAsDataURL(file);
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                required
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => {
                  return (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                name="stock"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div className="createProductFormFile">
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div className="createProductFormImage">
              {oldImages && <img src={oldImages} alt="Product preview" />}
            </div>
            <div className="createProductFormImage">
              {imagesPreview && <img src={imagesPreview} alt="Product preview" />}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Updateproduct;
