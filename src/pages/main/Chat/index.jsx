import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CardChat from "../../../components/module/CardChat";
import { BiSolidSend } from "react-icons/bi";
import { eachWeekOfInterval } from "date-fns";

const Chat = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message) {
      // console.log(`Message is: ${message}`);
      setMessage("");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

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
            maxW={{ base: "500px" }}
            maxH={{ base: "341.72px" }}
            w={{ base: "100%" }}
            h={{ base: "auto" }}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          />
          <Box
            w={{ base: "100%", xl: "80%", "2xl": "70%" }}
            h="600px"
            m="auto"
            position="absolute"
            top={0}
            left={0}
            right={0}
            px="28px"
          >
            <Flex
              mx="auto"
              justifyContent={{ base: "center", md: "flex-start" }}
              minW={{ base: "319px" }}
              w="full"
              h="full"
              bg="white"
              rounded="15px"
              boxShadow="0px 8px 27px 0px #0E3F6C30"
            >
              <Box
                maxW={{ md: "319px" }}
                mx={{ base: "28px" }}
                my={{ base: "40px" }}
              >
                <CardChat />
              </Box>
              {/* <Box
                bg="white"
                w="full"
                display={{ base: "none", md: "block" }}
                roundedRight="inherit"
                fontFamily="Lato"
              >
                <Flex
                  p="40px"
                  h="full"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Image
                    w="60px"
                    h="auto"
                    src="/src/assets/plane.png"
                    opacity="0.25"
                    mb="12px"
                  />
                  <Heading fontSize="x-large">Chat by Ankasa</Heading>
                  <Text opacity="0.75">
                    Send and receive messages in Ankasa
                  </Text>
                </Flex>
              </Box> */}
              <Box
                bg="#F5F6FA"
                w="full"
                display={{ base: "none", md: "flex" }}
                flexDirection="column"
                roundedRight="inherit"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap="4"
                  w="full"
                  h={"13%"}
                  bg="#2395FF"
                  bgGradient={[
                    "linear(to-br, #41A4FF, transparent)",
                    "linear(to-bl, #6cb7fe, #41A4FF)",
                  ]}
                  roundedTopRight="inherit"
                  p="10px"
                >
                  <Avatar
                    src={
                      "https://res.cloudinary.com/duo95jmu4/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1719669342/1719669341_ludovic-migneault-EZ4TYgXPNWk-unsplash.jpg"
                    }
                    borderRadius="15px"
                    borderWidth="0.5px"
                    borderColor="#E6E6E6"
                  >
                    <AvatarBadge
                      boxSize="20px"
                      borderWidth="4px"
                      bg="#2395FF"
                    />
                  </Avatar>

                  <Flex direction="column">
                    <Heading
                      fontFamily="Poppins"
                      fontSize="16px"
                      color="white"
                      fontWeight={600}
                      lineHeight="24px"
                      noOfLines={1}
                    >
                      Soham Henry
                    </Heading>
                    <Text
                      fontFamily="Lato"
                      fontSize="14px"
                      fontWeight={400}
                      lineHeight="16.8px"
                      color="white"
                      noOfLines={1}
                    >
                      Online
                    </Text>
                  </Flex>
                </Box>

                <Stack spacing={5} py={5} px={3} h="74%" overflow="auto">
                  {/* <Flex w="full" justifyContent="center" id="notification">
                    <Box
                      w="auto"
                      h="auto"
                      display="flex"
                      alignItems="center"
                      p="10px"
                      maxW="80%"
                      bg="tan"
                      rounded="15px"
                      textAlign="center"
                    >
                      <Text
                        fontSize="medium"
                        textColor="white"
                        fontWeight="700"
                      >
                        Notifications were added to this conversation
                      </Text>
                    </Box>
                  </Flex> */}

                  <Flex w="full" justifyContent="flex-end" id="client-sender">
                    <Box
                      w="auto"
                      h="auto"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      p="10px"
                      maxW="80%"
                      bg="#2395FF"
                      rounded="15px"
                    >
                      {/* <Heading fontSize="large">You</Heading> */}
                      <Text fontSize="medium" textColor="white">
                        Hi
                      </Text>
                    </Box>
                  </Flex>

                  <Flex
                    w="full"
                    justifyContent="flex-start"
                    id="client-receiver"
                  >
                    <Box
                      w="auto"
                      h="auto"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      p="10px"
                      maxW="80%"
                      bg="gray.400"
                      rounded="15px"
                    >
                      <Text fontSize="medium" textColor="white">
                        Hello
                      </Text>
                    </Box>
                  </Flex>
                </Stack>

                <Box
                  display="flex"
                  alignItems="center"
                  gap="4"
                  w="full"
                  h={"13%"}
                  p="15px"
                >
                  <InputGroup w="full" h="full" bg="gray.300" rounded="full">
                    <Input
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                      type="text"
                      rounded="full"
                      name="bodyMessage"
                      value={message}
                      placeholder="Type a message..."
                      h="full"
                      autoComplete="off"
                      _focus={{
                        border: "#2395FF",
                      }}
                    />
                    <InputRightElement width="4.5rem" h="100%">
                      <Button
                        onClick={handleSend}
                        type="submit"
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                      >
                        <BiSolidSend />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Stack>
      {/* Header */}
    </Box>
  );
};

export default Chat;
