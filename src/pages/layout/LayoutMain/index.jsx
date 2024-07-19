import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import SearchFlight from "../../../components/module/SearchFlightModal";

const LayoutMain = () => {
  return (
    <>
      <Flex>
        <h1>Navbar</h1>
        <Outlet />
        <Button
          _active={{
            bg: null,
            transform: null,
          }}
          bg="white"
          _hover="none"
        >
        footer
        </Button>
        <SearchFlight />
      </Flex>
    </>
  );
};

export default LayoutMain;
