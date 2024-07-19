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
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <NavLink to={"/flight"}>
            <Text
              alignItems={"center"}
              justifyContent={"space-between"}
              borderBottom={"5px solid"}
              borderColor={"transparent"}
              transition="all 0.1s"
              py="8px"
              _hover={{
                borderColor: "#2395FF",
              }}
            >
              Find Ticket
            </Text>
          </NavLink>
          <NavLink to={"/"}>
            <Text
              alignItems={"center"}
              justifyContent={"space-between"}
              borderBottom={"5px solid"}
              borderColor={"transparent"}
              transition="all 0.1s"
              py="8px"
              _hover={{
                borderColor: "#2395FF",
              }}
            >
              My Booking
            </Text>
          </NavLink>
        </Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap={{ base: "24px", md: "48px" }}
        >
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
          {/* <Box display={{ base: "none", lg: "block" }}>
            <HiOutlineEnvelope color="#595959" fontSize="28px" />
          </Box>
          <Box display={{ base: "none", lg: "block" }}>
            <AiOutlineBell color="#595959" fontSize="28px" />
          </Box>
          <Box borderRadius="100%" border="2px" borderColor="#2395FF" p="2px">
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </Box> */}
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
            <NavLink to={"/flight"}>Find Ticket</NavLink>
            <NavLink to={"/"}>My Booking</NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
