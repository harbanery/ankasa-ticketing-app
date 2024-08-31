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
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiFillBell, AiOutlineBell } from "react-icons/ai";
import { HiEnvelopeOpen, HiOutlineEnvelope } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { GiPlainCircle } from "react-icons/gi";
import { auth } from "../../../services/firebase";
import { removeTokenfromLocalStorage } from "../../../utils/localStorage";
import api from "../../../services/api";
import CardNotification from "../CardNotification";
import CardChat from "../CardChat";
import { IoMdSettings } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Navbar = ({ data_user = {}, data_chat = [], token = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
      navigation: "/profile/my-booking",
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
        <HamburgerBar lists={menu_lists} token={token} />
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
              <ChatBar data={data_chat} user={data_user} location={location} />

              <NotificationBar />

              <Menu>
                <Box
                  borderRadius="100%"
                  border="2px"
                  borderColor="#2395FF"
                  p="2px"
                >
                  <MenuButton
                    as={Avatar}
                    userSelect="none"
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
                  <NavLink to="/profile/my-profile">
                    <MenuItem
                      icon={<FaRegUserCircle color="#595959" fontSize="20px" />}
                      fontWeight={600}
                    >
                      Profile
                    </MenuItem>
                  </NavLink>
                  <NavLink to="/settings">
                    <MenuItem
                      icon={<IoMdSettings color="#595959" fontSize="20px" />}
                      fontWeight={600}
                    >
                      Settings
                    </MenuItem>
                  </NavLink>
                  <MenuItem
                    icon={<RiLogoutBoxRLine color="#F24545" fontSize="20px" />}
                    color="#F24545"
                    fontWeight={600}
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                  <MenuDivider display={{ lg: "none" }} />
                  <NavLink to="/chat">
                    <MenuItem
                      icon={
                        <HiOutlineEnvelope color="#595959" fontSize="20px" />
                      }
                      display={{ base: "flex", lg: "none" }}
                      fontWeight={600}
                    >
                      Chat
                    </MenuItem>
                  </NavLink>
                  {/* <MenuItem
                    icon={<AiOutlineBell color="#595959" fontSize="20px" />}
                    display={{ base: "flex", sm: "none" }}
                    fontWeight={600}
                  >
                    Notifications
                  </MenuItem> */}
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

const HamburgerBar = ({ lists, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
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
              {lists.map((menu) => {
                if (menu.required_token == true) {
                  {
                    return (
                      token && (
                        <MenuBar
                          key={menu.name}
                          menu={menu}
                          location={location}
                          onClick={onClose}
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
                      onClick={onClose}
                    />
                  );
                }
              })}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MenuBar = ({ menu, location, ...props }) => {
  return (
    <NavLink to={menu.navigation} {...props}>
      <Text
        fontWeight={location.pathname == menu.navigation && "700"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"5px solid"}
        borderColor={
          location.pathname == menu.navigation ? "#2395FF" : "transparent"
        }
        transition="all 0.1s cubic-bezier(.08,.52,.52,1)"
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

const NotificationBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover
      placement={"bottom-end"}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      trigger="hover"
    >
      <PopoverTrigger>
        <Box
          as="button"
          display={{ base: "block" }}
          position="relative"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          borderBottom={isOpen ? "5px solid" : "none"}
          borderColor={isOpen ? "#2395FF" : "transparent"}
          pb={isOpen ? "8px" : "0px"}
          _hover={{
            borderBottom: "5px solid",
            borderColor: "#2395FF",
            pb: "8px",
          }}
          // sx={{
          //   "& .icon-hover": {
          //     display: isOpen ? "block" : "none",
          //   },
          //   "& .icon-default": {
          //     display: isOpen ? "none" : "block",
          //   },
          // }}
        >
          <AiOutlineBell
            // className="icon-default"
            color="#595959"
            fontSize="28px"
          ></AiOutlineBell>
          <GiPlainCircle
            fontSize="12px"
            color="#2395FF"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              border: "1px solid white",
              borderRadius: "100%",
            }}
          />
          {/* <AiFillBell className="icon-hover" color="#595959" fontSize="28px" /> */}
        </Box>
      </PopoverTrigger>
      <PopoverContent
        w={{ base: "100%" }}
        maxW={{ base: "320px", sm: "350px", md: "425px" }}
        borderRadius="20px"
        boxShadow="0px 8px 27px 0px #0E3F6C30"
      >
        <PopoverBody
          mx={{ base: "16px", md: "28px" }}
          my={{ base: "20px", md: "40px" }}
        >
          <CardNotification />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const ChatBar = ({ data = [], user = {}, location }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isPath = location.pathname == "/chat";

  return (
    <Popover
      placement={"bottom-end"}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      trigger="hover"
    >
      <PopoverTrigger>
        <Box
          as="button"
          disabled={isPath ? true : false}
          display={{ base: "none", lg: "block" }}
          position="relative"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          borderBottom={isOpen ? "5px solid" : "none"}
          borderColor={isOpen ? "#2395FF" : "transparent"}
          pb={isOpen ? "8px" : "0px"}
          _hover={
            !isPath && {
              borderBottom: "5px solid",
              borderColor: "#2395FF",
              pb: "8px",
            }
          }
          // sx={{
          //   "& .icon-hover": {
          //     display: "none",
          //     opacity: "0%",
          //   },
          //   "&:hover .icon-hover": {
          //     display: "block",
          //     opacity: "100%",
          //   },
          //   "& .icon-default": {
          //     display: "block",
          //     opacity: "100%",
          //   },
          //   "&:hover .icon-default": {
          //     display: "none",
          //     opacity: "0%",
          //   },
          // }}
        >
          <HiOutlineEnvelope
            // className="icon-default"
            color="#595959"
            fontSize="28px"
          />
          <GiPlainCircle
            fontSize="12px"
            color="#2395FF"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              border: "1px solid white",
              borderRadius: "100%",
            }}
          />
          {/* <HiEnvelopeOpen
                  className="icon-hover"
                  color="#595959"
                  fontSize="28px"
                /> */}
        </Box>
      </PopoverTrigger>
      <PopoverContent
        display={{ base: "none", lg: "block" }}
        w={{ base: "100%" }}
        maxW={{ base: "320px", sm: "350px", md: "425px" }}
        borderRadius="20px"
        boxShadow="0px 8px 27px 0px #0E3F6C30"
      >
        <PopoverArrow />
        <PopoverBody
          mx={{ base: "16px", md: "28px" }}
          my={{ base: "20px", md: "40px" }}
        >
          <CardChat data={data} user={user} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Navbar;
