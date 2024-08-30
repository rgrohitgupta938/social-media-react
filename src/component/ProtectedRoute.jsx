import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  // Redirect to login page if user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render the protected component if authenticated
  return <>{element}</>;
};

export default ProtectedRoute;
