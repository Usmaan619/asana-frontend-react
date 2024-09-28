import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { GET_CASHE } from "../utils/helper";

export const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated || GET_CASHE("token") ? (
    Component
  ) : (
    <Navigate to="/dashboard" />
  );
};
