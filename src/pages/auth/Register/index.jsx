import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Container my="5%" maxW="sm">
      <Link to={"/"}>
        <Image
          position={"absolute"}
          top={10}
          src="/src/assets/brandicon.png"
          alt="Ankasa"
          w="158px"
          h="36px"
        />
      </Link>
      <Box display="flex" flexDirection="column" h="100%" gap="4">
        <Heading fontFamily="Poppins" fontWeight="600">
          Register
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
            type="text"
            size="lg"
            variant="flushed"
            placeholder="Full Name"
            errorBorderColor="crimson"
          />
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
          Sign Up
        </Button>
        <Box
          display="flex"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
          <Checkbox border="#2395FF" gap={3}>
            Accept terms and condition
          </Checkbox>
        </Box>
        <Box mt="8" mx="auto" bg="#D8D8D8" w="80%" h="1px" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
          gap="6"
        >
          <Text>Already have an account?</Text>
          <Button
            bg="white"
            borderRadius="10px"
            color="#2395FF"
            border="1px"
            borderColor="#2395FF"
            fontFamily="Poppins"
            fontWeight="700"
            fontSize="18px"
            size="lg"
            w="100%"
            h="52px"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _active={{
              bg: "#2395FF",
              color: "white",
            }}
            _focus={{
              boxShadow: "0px 8px 10px 0px #2395FF4D",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
