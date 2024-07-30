import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { auth } from "../../../services/firebase";
import { removeTokenfromLocalStorage } from "../../../utils/localStorage";
import api from "../../../services/api";

const Navbar = ({ data_user = {}, token = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // const { token } = getTokenfromLocalStorage();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await api.get(`logout`);

      const user = auth.currentUser;
      if (user) {
        try {
          await signOut(auth);
        } catch (error) {
          //
        }
      }

      removeTokenfromLocalStorage();
      navigate("/auth/login");
    } catch (error) {
      setAlert({ status: "error", message: err?.response?.data?.message });
      setAlertKey(alertKey + 1);
    }
  };

  const menu_lists = [
    {
      name: "Find Ticket",
      navigation: "/browse",
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
      minH={{ base: "auto", lg: "158px" }}
      px={{ base: "20px", md: "70px" }}
      py={{ base: "20px", md: "50px" }}
      fontFamily="Poppins"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
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
        <Drawer
          isOpen={isOpen}
          placement="top"
          size="sm"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay display={{ base: "flex", lg: "none" }} />
          <DrawerContent
            display={{ base: "flex", lg: "none" }}
            fontFamily="Poppins"
          >
            <DrawerCloseButton fontSize="16px" />
            <DrawerHeader></DrawerHeader>

            <DrawerBody mb={5}>
              <Box
                display={{ base: "flex" }}
                fontWeight="500"
                fontSize={{ base: "18px", xl: "20px" }}
                justifyContent="center"
                alignItems="center"
                gap="5rem"
              >
                {menu_lists.map((menu) => {
                  if (menu.required_token == true) {
                    {
                      return (
                        token && (
                          <MenuBar
                            key={menu.name}
                            menu={menu}
                            location={location}
                          />
                        )
                      );
                    }
                  } else {
                    return (
                      <MenuBar
                        key={menu.name}
                        menu={menu}
                        location={location}
                      />
                    );
                  }
                })}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
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
              <Box display={{ base: "none", sm: "block" }}>
                <AiOutlineBell color="#595959" fontSize="28px" />
              </Box>
              <Menu>
                <Box
                  borderRadius="100%"
                  border="2px"
                  borderColor="#2395FF"
                  p="2px"
                >
                  <MenuButton
                    as={Avatar}
                    cursor="pointer"
                    src={data_user.image}
                    borderRadius="100%"
                    mx="auto"
                  />
                </Box>
                <MenuList
                  borderRadius="10px"
                  boxShadow="0px 8px 10px 0px #dddfe24D"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                >
                  <NavLink to="/profile">
                    <MenuItem>My Profile</MenuItem>
                  </NavLink>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuDivider display={{ md: "none" }} />
                  <MenuItem
                    icon={<HiOutlineEnvelope color="#595959" fontSize="20px" />}
                    display={{ base: "flex", md: "none" }}
                  >
                    Chat
                  </MenuItem>
                  <MenuItem
                    icon={<AiOutlineBell color="#595959" fontSize="20px" />}
                    display={{ base: "flex", sm: "none" }}
                  >
                    Notifications
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </Flex>
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

export default Navbar;
