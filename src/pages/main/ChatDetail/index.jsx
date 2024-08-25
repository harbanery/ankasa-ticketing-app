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
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { formatTime } from "../../../utils/date";

const ChatDetail = () => {
  let { id } = useParams();

  const user_id = "1";

  const messages = [
    {
      id: "1",
      id_chat: "2",
      id_user: "1",
      text: "Theresa, I don't know what to say??",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "2",
      id_chat: "2",
      id_user: "3",
      text: "Say what???",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "3",
      id_chat: "2",
      id_user: "1",
      text: "Idk",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "4",
      id_chat: "2",
      id_user: "3",
      text: "COME ON JUST SAY IT?? DAMMIT!!!",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "5",
      id_chat: "2",
      id_user: "1",
      text: "You know that i want to hangout with someone",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "6",
      id_chat: "2",
      id_user: "3",
      text: "SOOOOO",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "7",
      id_chat: "2",
      id_user: "3",
      text: "Just DO IT OKAY",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "8",
      id_chat: "2",
      id_user: "1",
      text: "IK but....",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "9",
      id_chat: "2",
      id_user: "1",
      text: "What about watching movie together??",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "10",
      id_chat: "2",
      id_user: "3",
      text: "ckckck Its fine",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "11",
      id_chat: "2",
      id_user: "3",
      text: "We can watch another time...",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "12",
      id_chat: "2",
      id_user: "3",
      text: "Relax... okay??",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "13",
      id_chat: "2",
      id_user: "1",
      text: "Okayy... Love you",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "14",
      id_chat: "2",
      id_user: "3",
      text: "<3",
      created_at: "2024-08-24 16:20:35.318187+08",
    },
    {
      id: "15",
      id_chat: "4",
      id_user: "5",
      text: "Heyy, where are youu???",
      created_at: "2024-08-25 15:15:35.318187+08",
    },
    {
      id: "16",
      id_chat: "1",
      id_user: "2",
      text: "Hi",
      created_at: "2024-08-25 15:16:35.318187+08",
    },
    {
      id: "17",
      id_chat: "4",
      id_user: "1",
      text: "Lil bro, you go home first aight?",
      created_at: "2024-08-25 15:17:35.318187+08",
    },
    {
      id: "18",
      id_chat: "2",
      id_user: "1",
      text: "Theresa, I think I'm fucked up",
      created_at: "2024-08-25 15:17:35.318187+08",
    },
    {
      id: "19",
      id_chat: "2",
      id_user: "1",
      text: "I think I liked her",
      created_at: "2024-08-25 15:18:35.318187+08",
    },
    {
      id: "20",
      id_chat: "2",
      id_user: "1",
      text: "I'm sorry",
      created_at: "2024-08-25 15:18:35.318187+08",
    },
    {
      id: "21",
      id_chat: "1",
      id_user: "1",
      text: "Hello",
      created_at: "2024-08-25 15:21:35.318187+08",
    },
    {
      id: "22",
      id_chat: "3",
      id_user: "4",
      text: "Bro, can I come?",
      created_at: "2024-08-25 15:30:35.318187+08",
    },
    {
      id: "23",
      id_chat: "4",
      id_user: "5",
      text: "Okayy, gooodbayyyy",
      created_at: "2024-08-25 15:32:35.318187+08",
    },
    {
      id: "24",
      id_chat: "1",
      id_user: "2",
      text: "I'm just messing with ya",
      created_at: "2024-08-25 15:36:35.318187+08",
    },
    {
      id: "25",
      id_chat: "3",
      id_user: "1",
      text: "Yes, of course...",
      created_at: "2024-08-25 15:40:35.318187+08",
    },
    {
      id: "26",
      id_chat: "1",
      id_user: "1",
      text: "Bro, just go away",
      created_at: "2024-08-25 15:40:35.318187+08",
    },
    {
      id: "27",
      id_chat: "2",
      id_user: "3",
      text: "Why did you do that?",
      created_at: "2024-08-25 15:42:35.318187+08",
    },
  ];

  return (
    <Box
      bg="#F5F6FA"
      w="full"
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
      roundedRight="inherit"
    >
      <ChatRoom id={id} data={messages} />
    </Box>
  );
};

const ChatRoom = ({ id, data }) => {
  const [message, setMessage] = useState("");

  const user_id = "1";

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
    <>
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
          <AvatarBadge boxSize="14px" borderWidth="2px" bg="#2395FF" />
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

      <Stack
        spacing={5}
        py={5}
        px={3}
        h="74%"
        overflow="auto"
        flexDirection="column-reverse"
      >
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
        {data
          .filter((msg) => msg.id_chat == id)
          .reverse()
          .map((msg) => (
            <Flex
              w="full"
              justifyContent={
                msg.id_user === user_id ? "flex-end" : "flex-start"
              }
            >
              <Box
                w="auto"
                h="auto"
                display="flex"
                flexDirection={msg.id_user === user_id ? "row-reverse" : "row"}
                justifyContent={
                  msg.id_user === user_id ? "flex-end" : "flex-start"
                }
                alignItems="end"
                gap={3}
                p="10px"
                maxW="80%"
                bg={msg.id_user === user_id ? "#2395FF" : "gray.500"}
                rounded="15px"
              >
                {/* <Heading fontSize="large">You</Heading> */}
                <Text fontSize="medium" textColor="white">
                  {msg.text}
                </Text>
                <Text fontSize="small" textColor="gray.200">
                  {formatTime(msg.created_at)}
                </Text>
              </Box>
            </Flex>
          ))}

        {/* <Flex w="full" justifyContent="flex-end" id="client-sender">
          <Box
            w="auto"
            h="auto"
            display="flex"
            flexDirection="row-reverse"
            justifyContent="flex-end"
            alignItems="end"
            gap={3}
            p="10px"
            maxW="80%"
            bg="#2395FF"
            rounded="15px"
          >
            <Text fontSize="medium" textColor="white">
              Hi
            </Text>
            <Text fontSize="small" textColor="gray.200">
              3:15
            </Text>
          </Box>
        </Flex> */}

        {/* <Flex w="full" justifyContent="flex-start" id="client-receiver">
          <Box
            w="auto"
            h="auto"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="end"
            gap={3}
            p="10px"
            maxW="80%"
            bg="gray.400"
            rounded="15px"
          >
            <Text fontSize="medium" textColor="white">
              Hello
            </Text>
            <Text fontSize="small" textColor="gray.200">
              3:18
            </Text>
          </Box>
        </Flex> */}
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
    </>
  );
};

export default ChatDetail;
