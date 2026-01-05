import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignup";
import { useEffect } from "react";
import { store } from "./store";
import { loadUser } from "./Actions/userAction";
// import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import PaymentPage from "./component/Cart/PaymentPage";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import Updateproduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import UpdateOrder from "./component/Admin/UpdateOrder";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound";
import ScrollToTop from "./component/ScrollToTop/ScrollToTop";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      {/* {isAuthenticated && <UserOptions user={user} />} */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/About" element={<About />} />

        <Route path="/login" element={<LoginSignup />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />

        <Route
          element={
            <ProtectedRoute
              redirectTo="/login"
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="/account" element={<Profile />} />

          <Route path="/me/update" element={<UpdateProfile />} />

          <Route path="/password/update" element={<UpdatePassword />} />

          <Route path="/shipping" element={<Shipping />}></Route>

          <Route path="/order/confirm" element={<ConfirmOrder />} />

          <Route path="/process/payment" element={<PaymentPage />} />

          <Route path="/paymentsuccess" element={<OrderSuccess />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          element={
            <ProtectedRoute
              isAdmin={true}
              redirectTo="/login"
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/products" element={<ProductList />} />

          <Route path="/admin/product" element={<NewProduct />} />

          <Route path="/admin/product/:id" element={<Updateproduct />} />

          <Route path="/admin/orders" element={<OrderList />} />

          <Route path="/admin/order/:id" element={<UpdateOrder />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
