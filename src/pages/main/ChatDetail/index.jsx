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

const ChatDetail = () => {
  let { id } = useParams();

  return (
    <Box
      bg="#F5F6FA"
      w="full"
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
      roundedRight="inherit"
    >
      <ChatRoom id={id} />
    </Box>
  );
};

const ChatRoom = ({ id }) => {
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

        <Flex w="full" justifyContent="flex-start" id="client-receiver">
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
    </>
  );
};

export default ChatDetail;
