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
import React, { useEffect, useState } from "react";
import CardChat from "../../../components/module/CardChat";
import { BiSolidSend } from "react-icons/bi";
import { Outlet, useParams } from "react-router-dom";
import api from "../../../services/api";

const Chat = () => {
  let { id } = useParams();
  // console.log(id);

  const [chats, setChats] = useState({
    rooms: [],
    user: {},
  });

  const getChatRooms = async () => {
    try {
      const [responseProfile, responseChat] = await Promise.all([
        api.get(`customer/profile`),
        api.get("chats"),
      ]);

      setChats({
        rooms: responseChat?.data?.data,
        user: responseProfile?.data?.data,
      });
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  // console.log(chats);

  return (
    <Box bg={"gray.200"} minH={{ base: "800px" }}>
      <Stack
        bg="#2395FF"
        w={"full"}
        pt={{ base: "50px" }}
        borderBottomRadius={{ base: "20px", md: "30px" }}
        maxH="450px"
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
            h={{ base: "600px", xl: "625px" }}
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
              minW={{ base: "auto", md: "319px" }}
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
                <CardChat data={chats.rooms} user={chats.user} />
              </Box>

              {!id ? (
                <Box
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
                </Box>
              ) : (
                <Outlet />
              )}
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Chat;
