import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/module/Navbar";

const LayoutMain = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

export default LayoutMain;
