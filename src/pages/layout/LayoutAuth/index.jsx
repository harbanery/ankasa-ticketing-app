import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Outlet, redirect } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <Box h="100vh">
      <Flex w="100%" h="100%">
        <Box
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          w={{ base: "70%", lg: "100%" }}
          bg="#2395FF"
        >
          <Image
            src={"/src/assets/illustration.png"}
            alt="Ankasa Planes"
            w="50%"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
          w={{ base: "100%", xl: "70%" }}
          bg="white"
          position="relative"
        >
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export const authLoader = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (pathname == "/auth") {
    return redirect("/auth/register");
  }
  return null;
};

export default LayoutAuth;
