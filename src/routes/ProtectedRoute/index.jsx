import React from "react";
import { Outlet, redirect } from "react-router-dom";

const ProtectedRoute = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
