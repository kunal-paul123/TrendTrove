import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function NotFound() {
  return (
    <div className="PageNotFound">
      <ErrorOutlineIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;
