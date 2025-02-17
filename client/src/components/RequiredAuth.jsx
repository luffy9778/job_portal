import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
  const { auth,loggingOut } = useContext(AuthContext);
  
  if (loggingOut) {
    return <div>Logging out...</div>;
  }

  if (!auth?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== allowedRoles) {
    switch (auth?.role) {
      case "user":
        return <Navigate to="/" replace />;
      case "recruiter":
        return <Navigate to="/recruiter" replace />;
      case "admin":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }
  return <Outlet />;
};

export default RequiredAuth;
