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
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { PiCheck, PiChecks } from "react-icons/pi";
import { formatChat } from "../../../utils/date";

const CardChat = () => {
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
      <Flex justifyContent="space-between" alignItems="flex-end">
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
        {chats && chats.length !== 0 && (
          <Button
            bg="transparent"
            py="0px"
            px="0.5em"
            h="auto"
            mb="50px"
            fontWeight={600}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"#2395FF"}
          >
            Filter
          </Button>
        )}
      </Flex>

      <Stack
        divider={<StackDivider borderColor="#E6E6E6" />}
        spacing={0.5}
        fontFamily="Lato"
      >
        {chats && chats.length !== 0 ? (
          chats.map((chat) => (
            <Box
              key={chat.id}
              py="12px"
              px="4px"
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
                src={chat.receiver_image}
                borderRadius="15px"
                borderWidth="0.5px"
                borderColor="#E6E6E6"
              >
                {chat.receiver_status == "online" && (
                  <AvatarBadge boxSize="20px" borderWidth="4px" bg="#2395FF" />
                )}
              </Avatar>
              <Stack textAlign="left" w="100%">
                <Heading
                  fontFamily="Poppins"
                  fontSize="16px"
                  fontWeight={600}
                  lineHeight="24px"
                >
                  {chat.receiver}
                </Heading>
                <Text
                  fontFamily="Lato"
                  fontSize="14px"
                  fontWeight={400}
                  lineHeight="16.8px"
                  color={
                    chat.receiver_chat_status == "reply" ? "#2395FF" : "#6B6B6B"
                  }
                  noOfLines={1}
                >
                  {chat.last_messenger == chat.sender && "Me: "}
                  {chat.last_message}
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
                  {formatChat(chat.date_time)}
                </Text>
                {(chat.receiver_chat_status == "read" ||
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
                )}
              </Flex>
            </Box>
          ))
        ) : (
          // <Box display="flex" gap="30px" justifyContent="space-between">
          //   <Avatar
          //     src="https://s3-alpha-sig.figma.com/img/73a0/4afb/da4073a0e634cc12a6a69a7f71a9585c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EBQUL4xF~0~nuM01vvg8WUm7Z2CEuAf0~XqVZFTsnW~6utyNxEA36OUuu4~8cueshMql973aOeGIbIB1H5JyYTpDI0ijR4eOPQFbfWy5IDGZqaao2eGY9cESG0sHUKRQDPrEO-CfjUhvnQzyFKlPoQrH9q-OLM873SC0VZosqPnVi7C4TytIsmP8MrXSiRX8IYqhlpnI~CWKRYfC0v3h2vdJFywA4USyUW8cv~nAgaW~BktjAIi8S~UOXR9AtkCqsq7WFDqxwjKovzWKHykElErHLndMl0L~uUgpWns9--DmKXBZ4R9gITra9eaVP8u8W4QeBDZgNR2B0dAHeA4Spg__"
          //     borderRadius="15px"
          //     borderWidth="0.5px"
          //     borderColor="#0E3F6C30"
          //   >
          //     <AvatarBadge boxSize="20px" borderWidth="4px" bg="#2395FF" />
          //   </Avatar>
          //   <Stack w="100%">
          //     <Heading
          //       fontFamily="Poppins"
          //       fontSize="16px"
          //       fontWeight={600}
          //       lineHeight="24px"
          //     >
          //       Soham Henry
          //     </Heading>
          //     <Text
          //       fontFamily="Lato"
          //       fontSize="14px"
          //       fontWeight={400}
          //       lineHeight="16.8px"
          //       color="#6B6B6B"
          //     >
          //       me: bro just f off
          //     </Text>
          //   </Stack>
          //   <Flex
          //     direction="column"
          //     justifyContent="space-between"
          //     alignItems="flex-end"
          //   >
          //     <Text
          //       fontFamily="Lato"
          //       fontSize="12px"
          //       fontWeight={400}
          //       lineHeight="18px"
          //       color="#979797"
          //     >
          //       5:30
          //     </Text>
          //     <PiChecks fontSize="20px" color="#C4C4C4" />
          //   </Flex>
          // </Box>
          // chats.map((chat) => (
          //   <></>
          //   // <Box
          //   //   key={notif.id}
          //   //   as="Button"
          //   //   textAlign="left"
          //   //   px="25px"
          //   //   py="16px"
          //   //   borderRadius="13px"
          //   //   border={`1px solid ${
          //   //     notif.read_status == "false" ? `#2395FF` : `#D7D7D7`
          //   //   }`}
          //   //   bgColor={notif.read_status == "false" && "#F6FBFF"}
          //   // >
          //   //   <Heading
          //   //     fontWeight="600"
          //   //     fontSize="16px"
          //   //     lineHeight="19.2px"
          //   //     color={notif.read_status == "false" && "#2395FF"}
          //   //     mb="10px"
          //   //   >
          //   //     {notif.title}
          //   //   </Heading>
          //   //   <Text
          //   //     fontWeight="400"
          //   //     fontSize="14px"
          //   //     lineHeight="18px"
          //   //     color="#6B6B6B"
          //   //     mb="20px"
          //   //     noOfLines={2}
          //   //   >
          //   //     {notif.description}
          //   //   </Text>
          //   // </Box>
          // ))
          <Box textAlign="center" py={8}>
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
