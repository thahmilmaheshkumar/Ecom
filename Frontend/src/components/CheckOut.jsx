import React from "react";
import Order from "../pages/Order";
import { Navigate } from "react-router-dom";

const CheckOut = () => {
  const canCheckout = sessionStorage.getItem("canCheckout");

  if (!canCheckout) {
    return <Navigate to="/" replace />;
  }
  return <Order />;
};

export default CheckOut;
