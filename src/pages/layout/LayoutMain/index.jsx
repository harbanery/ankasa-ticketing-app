import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import api from "../../../services/api";
import {
  getTokenfromLocalStorage,
  removeTokenfromLocalStorage,
} from "../../../utils/localStorage";

const LayoutMain = () => {
  const { data, token } = useLoaderData();
  // console.log(token);
  const user = data?.data;
  // console.log(user);

  return (
    <>
      <Navbar data_user={user} token={token} />
      <Outlet />
      <Footer />
    </>
  );
};

export const mainLoader = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const { token } = getTokenfromLocalStorage();

  // if (pathname == "/auth") {
  //   return redirect("/auth/register");
  // }

  if (token) {
    try {
      const response = await api.get(`customer/profile`);
      return { data: response.data, token: token };
    } catch (error) {
      console.error("Error fetching profile data", error);
      removeTokenfromLocalStorage();
    }
  }

  return { data: {}, token: "" };
};

export default LayoutMain;
