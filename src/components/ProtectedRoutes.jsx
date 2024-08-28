import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      // Token expired
      localStorage.removeItem("authToken");
      return <Navigate to="/" />;
    }

    return <Element />;
  } catch (error) {
    localStorage.removeItem("authToken");
    return <Navigate to="/" />;
  }
};
// Add PropTypes validation
ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
export default ProtectedRoute;
