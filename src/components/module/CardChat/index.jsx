import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PiCheck, PiChecks } from "react-icons/pi";
import { formatChat } from "../../../utils/date";
import { useNavigate } from "react-router-dom";

const CardChat = ({ data = [], user = {} }) => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    if (username) {
      // console.log(`Message is: ${message}`);
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  // status: none, sent, unread, read, reply
  // const chats = [];
  const chats = [
    {
      id: "1",
      id_user: "1",
      sender: "Raihan Yusuf",
      receiver: "Soham Henry",
      receiver_status: "online",
      receiver_image:
        "https://res.cloudinary.com/duo95jmu4/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1719669342/1719669341_ludovic-migneault-EZ4TYgXPNWk-unsplash.jpg",
      receiver_role: "customer",
      last_messenger: "Raihan Yusuf",
      last_message: "Bro, just go away",
      date_time: "2024-08-03 15:20:35.318187+08",
      receiver_chat_status: "read",
      reply_count: "0",
    },
    {
      id: "2",
      id_user: "1",
      sender: "Raihan Yusuf",
      receiver: "Theresa Webb",
      receiver_status: "offline",
      receiver_image:
        "https://res.cloudinary.com/duo95jmu4/image/upload/v1715944105/samples/upscale-face-1.jpg",
      receiver_role: "customer",
      last_messenger: "Theresa Webb",
      last_message: "Why did you do that?",
      date_time: "2024-08-03 08:30:35.318187+08",
      receiver_chat_status: "reply",
      reply_count: "1",
    },
    {
      id: "3",
      id_user: "1",
      sender: "Raihan Yusuf",
      receiver: "Milky Choco",
      receiver_status: "online",
      receiver_image:
        "https://res.cloudinary.com/duo95jmu4/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1720149035/1720149035_charlie-green.jpg",
      receiver_role: "customer",
      last_messenger: "Raihan Yusuf",
      last_message: "Yes, of course come to Calvin's house!!!",
      date_time: "2024-08-02 07:20:35.318187+08",
      receiver_chat_status: "unread",
      reply_count: "0",
    },
    {
      id: "4",
      id_user: "1",
      sender: "Raihan Yusuf",
      receiver: "Brother",
      receiver_status: "offline",
      receiver_image:
        "https://res.cloudinary.com/duo95jmu4/image/upload/v1715944078/samples/people/boy-snow-hoodie.jpg",
      receiver_role: "customer",
      last_messenger: "Brother",
      last_message: "Okay, goodbaayyy",
      date_time: "2024-07-29 07:20:35.318187+08",
      receiver_chat_status: "no_reply",
      reply_count: "0",
    },
  ];

  return (
    <>
      <Flex justifyContent="space-between" alignItems="flex-end" maxH="625px">
        <Box mb="50px">
          <Text
            fontFamily={"Poppins"}
            fontWeight={500}
            fontSize={"14px"}
            lineHeight={"21px"}
            letterSpacing={5}
            color={"#2395FF"}
            textTransform="uppercase"
          >
            Chats
          </Text>
          <Text
            mt={2}
            fontFamily={"Poppins"}
            fontWeight={600}
            fontSize={"24px"}
            lineHeight={"36px"}
          >
            Chats
          </Text>
        </Box>
        <Button
          onClick={onOpen}
          bg="transparent"
          py="0px"
          px="0.5em"
          h="auto"
          mb="50px"
          fontWeight={600}
          fontSize={"16px"}
          lineHeight={"24px"}
          color={"#2395FF"}
          fontFamily={"Poppins"}
        >
          Add Room
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent fontFamily={"Poppins"}>
            <ModalHeader>Find your new friend or customer!</ModalHeader>
            <ModalBody>
              <Input
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                fontFamily={"Lato"}
                type="search"
                name="username"
                value={username}
                placeholder="Search username"
                autoComplete="off"
              />

              <Box
                mt={3}
                py="12px"
                px="4px"
                minW={{ lg: "319px" }}
                borderRadius="10px"
                display="flex"
                gap="30px"
                justifyContent="space-between"
                alignItems="center"
                userSelect="none"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: "#E6E6E6",
                }}
              >
                <Avatar
                  src={""}
                  bg="gray.400"
                  borderRadius="15px"
                  borderWidth="0.5px"
                  borderColor="#E6E6E6"
                ></Avatar>
                <Stack textAlign="left" w="100%">
                  <Heading
                    fontFamily="Poppins"
                    fontSize="16px"
                    fontWeight={600}
                    lineHeight="24px"
                    noOfLines={1}
                  >
                    {"Qarun Mustafa"}
                  </Heading>
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      <Stack
        divider={<StackDivider borderColor="#E6E6E6" />}
        spacing={0.5}
        fontFamily="Lato"
        maxH="404px"
        overflowY="scroll"
        style={{
          "::WebkitScrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {data && data.length !== 0 ? (
          data.map((chat) => (
            <Box
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`, { replace: true })}
              py="12px"
              px="4px"
              minW={{ lg: "319px" }}
              borderRadius="10px"
              display="flex"
              gap="30px"
              justifyContent="space-between"
              userSelect="none"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                bg: "#E6E6E6",
              }}
            >
              <Avatar
                src={chat.members[0].image}
                bg="gray.400"
                borderRadius="15px"
                borderWidth="0.5px"
                borderColor="#E6E6E6"
              >
                {/* {chat.receiver_status == "online" && (
                  <AvatarBadge boxSize="20px" borderWidth="4px" bg="#2395FF" />
                )} */}
              </Avatar>
              <Stack textAlign="left" w="100%">
                <Heading
                  fontFamily="Poppins"
                  fontSize="16px"
                  fontWeight={600}
                  lineHeight="24px"
                  noOfLines={1}
                >
                  {chat.members[0].username}
                </Heading>
                <Text
                  fontFamily="Lato"
                  fontSize="14px"
                  fontWeight={400}
                  lineHeight="16.8px"
                  color={chat.status == "reply" ? "#2395FF" : "#6B6B6B"}
                  noOfLines={1}
                >
                  {chat.last_message.username == user.username && "Me: "}
                  {chat.last_message.body}
                </Text>
              </Stack>
              <Flex
                direction="column"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Text
                  fontFamily="Lato"
                  fontSize="12px"
                  fontWeight={400}
                  lineHeight="18px"
                  color="#979797"
                >
                  {formatChat(chat.last_message.created_at)}
                </Text>
                {/* {(chat.receiver_chat_status == "read" ||
                  chat.receiver_chat_status == "unread") && (
                  <PiChecks
                    fontSize="20px"
                    color={
                      chat.receiver_chat_status == "read"
                        ? "#2395FF"
                        : "#C4C4C4"
                    }
                  />
                )}
                {chat.receiver_chat_status == "sent" && (
                  <PiCheck fontSize="20px" color="#C4C4C4" />
                )}
                {chat.receiver_chat_status == "reply" && (
                  <Tag
                    fontFamily="Poppins"
                    fontSize="10px"
                    fontWeight={400}
                    size="sm"
                    bg="#2395FF"
                    borderRadius="full"
                    variant="solid"
                  >
                    <TagLabel>{chat.reply_count}</TagLabel>
                  </Tag>
                )} */}
              </Flex>
            </Box>
          ))
        ) : (
          <Box
            py={8}
            minW="319px"
            minH="319px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontSize="20px" fontFamily="Poppins" fontWeight="600">
              No Chat Today
            </Heading>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default CardChat;
