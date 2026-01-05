// import "./Header.css";
// import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialAction from "@mui/material/SpeedDialAction";
// import Backdrop from "@mui/material/Backdrop";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
// import ListAltSharpIcon from "@mui/icons-material/ListAltSharp";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Profile from "../../../images/Profile.png";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { logout } from "../../../Actions/userAction";

// function UserOptions() {
//   const { cartItems } = useSelector((state) => state.cart);

//   const { user } = useSelector((state) => state.user);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const actions = [
//     { icon: <PersonIcon />, name: "Profile", func: account },
//     { icon: <ListAltSharpIcon />, name: "Order", func: orders },
//     {
//       icon: (
//         <ShoppingCartIcon
//           style={{ color: cartItems?.length > 0 ? "tomato" : "unset" }}
//         />
//       ),
//       name: `Cart(${cartItems?.length})`,
//       func: cart,
//     },
//     { icon: <ExitToAppSharpIcon />, name: "Logout", func: logoutUser },
//   ];

//   if (user && user.role === "admin") {
//     actions.unshift({
//       icon: <DashboardIcon />,
//       name: "Dashboard",
//       func: dashboard,
//     });
//   }

//   function dashboard() {
//     navigate("/admin/dashboard");
//   }
//   function account() {
//     navigate("/account");
//   }
//   function orders() {
//     navigate("/orders");
//   }
//   function cart() {
//     navigate("/cart");
//   }
//   function logoutUser() {
//     dispatch(logout());
//     toast.success("Logout Successfully");
//   }

//   return (
//     <>
//       <Backdrop open={open} style={{ zIndex: "10" }} />
//       <SpeedDial
//         className="speedDial"
//         ariaLabel="SpeedDial tooltip example"
//         onClose={() => setOpen(false)}
//         onOpen={() => setOpen(true)}
//         style={{ zIndex: "11" }}
//         open={open}
//         direction="down"
//         icon={<img className="speedDialIcon" src={Profile} alt="profile" />}
//       >
//         {actions.map((action) => {
//           return (
//             <SpeedDialAction
//               key={action.name}
//               icon={action.icon}
//               tooltipTitle={action.name}
//               onClick={action.func}
//               tooltipOpen={window.innerWidth <= 600 ? true : false}
//             />
//           );
//         })}
//       </SpeedDial>
//     </>
//   );
// }

// export default UserOptions;
