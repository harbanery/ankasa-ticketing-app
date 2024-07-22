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
import React from "react";

const ForgotPassword = () => {
  return (
    <Box h="100vh">
      <Flex w="100%" h="100%">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
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
          w="70%"
          bg="white"
          position="relative"
        >
          <Container my="5%" maxW="sm">
            <Image
              position={"absolute"}
              top={10}
              src="/src/assets/brandicon.png"
              alt="Ankasa"
              w="23%"
            />
            <Box display="flex" flexDirection="column" h="100%" gap="4">
              <Heading fontWeight={600}>Login</Heading>
              <Flex direction="column" my="5" gap="7">
                <Input
                  type="text"
                  size="lg"
                  variant="flushed"
                  placeholder="Username"
                />
                <Input
                  type="password"
                  size="lg"
                  variant="flushed"
                  placeholder="Password"
                />
              </Flex>
              <Button colorScheme="blue" size="lg" w="100%">
                Sign In
              </Button>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text>Did You Forgot Your Password?</Text>
              </Box>
            </Box>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForgotPassword;
