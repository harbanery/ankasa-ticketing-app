import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { formatNotification } from "../../../utils/date";

const CardNotification = () => {
  // const notifications = [];
  const notifications = [
    {
      id: "3",
      id_user: "1",
      title: "Congratulations",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum amet eveniet commodi porro praesentium quod nesciunt doloremque?",
      created_at: "2024-07-31 20:01:35.318187+08",
      read_status: "false",
    },
    {
      id: "2",
      id_user: "1",
      title: "Congratulations",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum amet eveniet commodi porro praesentium quod nesciunt doloremque?",
      created_at: "2024-07-31 08:01:35.318187+08",
      read_status: "true",
    },
    {
      id: "1",
      id_user: "1",
      title: "Continue Payment",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum amet eveniet commodi porro praesentium quod nesciunt doloremque?",
      created_at: "2024-07-29 20:01:35.318187+08",
      read_status: "true",
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
            Notifications
          </Text>
          <Text
            mt={2}
            fontFamily={"Poppins"}
            fontWeight={600}
            fontSize={"24px"}
            lineHeight={"36px"}
          >
            Notifications
          </Text>
        </Box>
        {notifications && notifications.length !== 0 && (
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
            Clear
          </Button>
        )}
      </Flex>

      <Flex
        fontFamily="Lato"
        direction="column"
        gap="20px"
        pt="10px"
        h="400px"
        overflowY="scroll"
        style={{
          "::WebkitScrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {notifications && notifications.length !== 0 ? (
          notifications.map((notif) => (
            <Box
              userSelect="none"
              key={notif.id}
              textAlign="left"
              px="25px"
              py="16px"
              borderRadius="13px"
              border={`1px solid ${
                notif.read_status == "false" ? `#2395FF` : `#D7D7D7`
              }`}
              bgColor={notif.read_status == "false" && "#F6FBFF"}
            >
              <Heading
                fontWeight="600"
                fontSize="16px"
                lineHeight="19.2px"
                color={notif.read_status == "false" && "#2395FF"}
                mb="10px"
              >
                {notif.title}
              </Heading>
              <Text
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                color="#6B6B6B"
                mb="20px"
                noOfLines={2}
              >
                {notif.description}
              </Text>

              <Text
                fontWeight="400"
                fontSize="12px"
                lineHeight="14.4px"
                color="#6B6B6B"
              >
                {formatNotification(notif.created_at)}
              </Text>
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={8}>
            <Heading fontSize="20px" fontFamily="Poppins" fontWeight="600">
              No Notification Today
            </Heading>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default CardNotification;
