import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import toast from "react-hot-toast";
import model2 from "../../images/model2.jpg";

function Home() {
  const { loading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const shopeNow = () => {
    window.scrollTo({
      top: 720,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, toast]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="TrendTrove" />
          <div className="fashion-sale">
            <div className="fashion-content">
              <h3 className="sale-text">Summer Collection</h3>
              <h1 className="title">Minimal Menz Style</h1>
              <p className="description">
                Step into style with our latest fashion collection – trendy,
                comfortable, and designed just for you!
              </p>
              <button onClick={shopeNow} className="shop-button">
                SHOP NOW <span className="arrow">→</span>
              </button>
            </div>
            <div className="fashion-image">
              <img src={model2} alt="Fashion Model" />
            </div>
          </div>
          <h2 className="homeHeading">New Collections</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} {...product} />;
              })}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
