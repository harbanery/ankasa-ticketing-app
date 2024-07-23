import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";

const LayoutMain = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutMain;
