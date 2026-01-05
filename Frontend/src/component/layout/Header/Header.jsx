import { useDispatch } from "react-redux";
import logo from "../../../images/logo4.png";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import { createSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { logout } from "../../../Actions/userAction";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const dispatch = useDispatch();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, func: home },
    { text: "Search", icon: <SearchIcon />, func: search },
    {
      text: "Products",
      icon: <InventoryIcon />,
      func: products,
    },
    {
      text: `Cart(${cartItems?.length})`,
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems?.length > 0 ? "tomato" : "unset" }}
        />
      ),
      func: cart,
    },
    { text: "Orders", icon: <ShoppingBagIcon />, func: orders },
    { text: "About", icon: <InfoIcon />, func: about },
    { text: "Contact", icon: <ContactsIcon />, func: contact },
    { text: "Profile", icon: <AccountCircleIcon />, func: account },
    ...(isAuthenticated
      ? [{ text: "Logout", icon: <LogoutIcon />, func: logoutUser }]
      : []),
  ];

  if (user && user.role === "admin") {
    menuItems.splice(1, 0, {
      text: "Dashboard",
      icon: <DashboardIcon />,
      func: dashboard,
    });
  }

  function home() {
    navigate("/");
  }
  function search() {
    navigate("/search");
  }
  function products() {
    navigate("/products");
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function account() {
    navigate("/account");
  }
  function orders() {
    navigate("/orders");
  }
  function cart() {
    navigate("/cart");
  }
  function about() {
    navigate("/about");
  }
  function contact() {
    navigate("/contact");
  }
  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  const DrawerList = (
    <Box
      sx={{
        width: 260,
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            color: "#0d47a1",
            letterSpacing: "1px",
            background: "linear-gradient(45deg, #2196f3, #f44336)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Trend<span style={{ color: "#f44336" }}>Trove</span>
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={item.func}
              sx={{
                borderRadius: "12px",
                mx: 1,
                px: 2,
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#e0e0e0", // your hover color
                },
              }}
            >
              <ListItemIcon sx={{ color: "#000" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={500}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 15,
          zIndex: 1000,
          padding: "10px",
          height: "100vh",
        }}
      >
        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>

        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>

        {/* Push page content below the AppBar */}
      </Box>
    </>
  );
}

export default Header;
