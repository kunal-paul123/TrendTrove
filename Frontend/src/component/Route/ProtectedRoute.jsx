import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

function ProtectedRoute({ isAdmin, children, isAuthenticated, redirectTo }) {
  const { loading, user } = useSelector((state) => state.user);

  if (loading || isAuthenticated === undefined) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return <Navigate to={redirectTo} />;
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
