import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <Container my="5%" maxW="sm">
      <Link to={"/"}>
        <Image
          position={"absolute"}
          top={10}
          src="/src/assets/brandicon.png"
          alt="Ankasa"
          w="23%"
        />
      </Link>
      <Box display="flex" flexDirection="column" h="100%" gap="4">
        <Heading fontFamily="Poppins" fontWeight="600">
          Login
        </Heading>
        <Flex
          direction="column"
          my="5"
          gap="7"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
          <Input
            type="email"
            size="lg"
            variant="flushed"
            placeholder="Email"
            errorBorderColor="crimson"
          />
          <Input
            type="password"
            size="lg"
            variant="flushed"
            placeholder="Password"
            errorBorderColor="crimson"
          />
        </Flex>
        <Button
          bg="#2395FF"
          borderRadius="10px"
          color="white"
          size="lg"
          w="100%"
          h="57px"
          fontFamily="Poppins"
          fontSize="18px"
          fontWeight="700"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          boxShadow="0px 8px 10px 0px #2395FF4D"
          _hover={{ bg: "#1971c2" }}
          _active={{
            bg: "#dddfe2",
          }}
          _focus={{
            boxShadow: "0px 8px 10px 0px #2395FF4D",
          }}
        >
          Sign In
        </Button>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
          <Text>Did You Forgot Your Password?</Text>
          <Text borderBottom="1px" color="#2395FF">
            <Link to={"/auth/forgot-password"}>Tap here for reset</Link>
          </Text>
        </Box>
        <Box mt="8" mx="auto" bg="#D8D8D8" w="80%" h="1px" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
          gap="4"
        >
          <Text>or sign in with</Text>
          <Flex gap="4">
            <Button
              bg="white"
              borderRadius="10px"
              color="white"
              border="1px"
              borderColor="#2395FF"
              size="lg"
              w="100%"
              h="52px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _active={{
                bg: "#2395FF",
              }}
              _focus={{
                boxShadow: "0px 8px 10px 0px #2395FF4D",
              }}
            >
              <FcGoogle fontSize="24px" />
            </Button>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
