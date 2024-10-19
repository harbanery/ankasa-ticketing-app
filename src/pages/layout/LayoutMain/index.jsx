import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";

const LayoutMain = () => {
  const { data, token } = useLoaderData();
  const user = data?.profile?.data;
  const chats = data?.chats?.data;

  return (
    <>
      <Navbar data_user={user} data_chat={chats} token={token} />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutMain;
