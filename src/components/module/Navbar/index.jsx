import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { getTokenfromLocalStorage } from "../../../utils/localStorage";

const Navbar = ({ data_user = {}, token = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { token } = getTokenfromLocalStorage();

  const menu_lists = [
    {
      name: "Find Ticket",
      navigation: "/flight",
      required_token: false,
    },
    {
      name: "My Booking",
      navigation: "/my-booking",
      required_token: true,
    },
  ];

  return (
    <Box
      w="100%"
      minH="158px"
      px={{ base: "20px", md: "70px" }}
      py={{ base: "50px" }}
      fontFamily="Poppins"
    >
      <Flex justifyContent="space-between" alignItems="center" gap={"2rem"}>
        <Button
          display={{ base: "flex", lg: "none" }}
          aspectRatio={1}
          borderRadius="10px"
          p="0"
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? <IoClose fontSize="20px" /> : <FaBars />}
        </Button>
        {/* <IconButton
          size={"md"}
          icon={isOpen ? <IoClose fontSize={28} /> : <FaBars />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        /> */}
        <NavLink to={"/"}>
          <Image
            src="/src/assets/brandicon.png"
            alt="Logo"
            w={{ base: "100%", lg: "158px" }}
            h={{ base: "auto", lg: "36px" }}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          />
        </NavLink>
        <Box
          display={{ base: "none", lg: "flex" }}
          fontWeight="500"
          fontSize={{ base: "16px", xl: "18px" }}
          justifyContent="center"
          alignItems="center"
          gap="5rem"
        >
          {menu_lists.map((menu) => {
            if (menu.required_token == true) {
              {
                return (
                  token && (
                    <MenuBar key={menu.name} menu={menu} location={location} />
                  )
                );
              }
            } else {
              return (
                <MenuBar key={menu.name} menu={menu} location={location} />
              );
            }
          })}
        </Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap={{ base: "24px", md: "48px" }}
        >
          {!token ? (
            <Button
              onClick={() => navigate("/auth/register")}
              bg="#2395FF"
              borderRadius="10px"
              color="white"
              size="lg"
              w="100%"
              h={{ base: "40px", lg: "50px" }}
              px={{ base: "1rem", sm: "2rem", xl: "5rem" }}
              fontFamily="Poppins"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="700"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              boxShadow="0px 8px 10px 0px #2395FF4D"
              _hover={{ bg: "#1971c2" }}
              _active={{
                bg: "#dddfe2",
                boxShadow: "0px 8px 10px 0px #dddfe24D",
              }}
            >
              Sign Up
            </Button>
          ) : (
            <>
              <Box display={{ base: "none", md: "block" }}>
                <HiOutlineEnvelope color="#595959" fontSize="28px" />
              </Box>
              <Box display={{ base: "none", md: "block" }}>
                <AiOutlineBell color="#595959" fontSize="28px" />
              </Box>
              <Box
                borderRadius="100%"
                border="2px"
                borderColor="#2395FF"
                p="2px"
              >
                <Avatar name={data_user.username} src={data_user.image} />
              </Box>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box
          bg="gray.200"
          position={"absolute"}
          borderRadius="10px"
          p="1rem"
          display={{ base: "block", lg: "none" }}
          boxShadow="0px 8px 10px 0px #dddfe24D"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        >
          <Stack as={"nav"} spacing={4} direction={"column-reverse"}>
            {menu_lists.map((menu) => {
              if (menu.required_token == true) {
                {
                  return (
                    token && (
                      <MenuBarDisclosure
                        key={menu.name}
                        menu={menu}
                        location={location}
                      />
                    )
                  );
                }
              } else {
                return (
                  <MenuBarDisclosure
                    key={menu.name}
                    menu={menu}
                    location={location}
                  />
                );
              }
            })}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const MenuBar = ({ menu, location }) => {
  return (
    <NavLink to={menu.navigation}>
      <Text
        fontWeight={location.pathname == menu.navigation && "700"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"5px solid"}
        borderColor={
          location.pathname == menu.navigation ? "#2395FF" : "transparent"
        }
        transition="all 0.1s"
        py="8px"
        _hover={{
          borderColor: "#2395FF",
        }}
      >
        {menu.name}
      </Text>
    </NavLink>
  );
};

const MenuBarDisclosure = ({ menu, location }) => {
  return (
    <NavLink to={menu.navigation}>
      <Text fontWeight={location.pathname == menu.navigation && "700"}>
        {menu.name}
      </Text>
    </NavLink>
  );
};

export default Navbar;
