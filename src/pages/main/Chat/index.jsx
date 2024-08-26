import { Box, Flex, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Chat = () => {
  return (
    <Box h={"100vh"} bg={"gray.200"}>
      {/* Header */}
      {/* <Box h="50px" bg="blue"></Box> */}
      <Stack
        bg="#2395FF"
        w={"full"}
        pt={{ base: "50px" }}
        borderBottomRadius={{ base: "20px", md: "30px" }}
      >
        <Box position={"relative"} h="400px">
          <Image
            position={"absolute"}
            src="/src/assets/plane.png"
            alt="Logo"
            left={0}
            bottom={0}
            w={{ base: "100%", sm: "500px" }}
            h={{ base: "auto", sm: "341.72px" }}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          />
        </Box>
      </Stack>
      {/* Header */}
    </Box>
  );
};

export default Chat;
