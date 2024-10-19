import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { formatOrderDate } from "../../../../utils/date";
import { Link as ReactRouterLink } from "react-router-dom";

const MyBooking = () => {
  const status = [
    {
      stats: "PENDING",
      display: "Waiting for payment",
    },
    {
      stats: "SUCCEEDED",
      display: "Eticket issued",
    },
  ];

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await api.get(`orders`);

      setOrders(response?.data?.data);
    } catch (error) {
      console.error("Error fetching order data", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box fontFamily={"Poppins"}>
      <Box>
        <Text
          fontWeight={500}
          fontSize={"14px"}
          lineHeight={"21px"}
          letterSpacing={5}
          color={"#2395FF"}
        >
          MY BOOKING
        </Text>
        <Text mt={2} fontWeight={600} fontSize={"24px"} lineHeight={"36px"}>
          My Booking
        </Text>
      </Box>
      {orders?.length > 0 ? (
        orders?.map((order) => (
          <Box
            key={order?.id}
            bg={"white"}
            _hover={{ bg: "gray.100" }}
            mt={2}
            cursor={"pointer"}
            rounded={10}
          >
            <Box
              as={ReactRouterLink}
              to={
                order?.is_active
                  ? `/my-booking/${order?.id}`
                  : order?.payment_url
              }
              target={order?.is_active ? "_self" : "_blank"}
              rounded={10}
            >
              <Box
                borderBottom={"1px solid"}
                borderColor={"gray.200"}
                rounded="inherit"
                _hover={{ bg: "gray.100" }}
                py={10}
                px={3}
              >
                <Text>{formatOrderDate(order?.departure_schedule)}</Text>
                <Flex
                  fontWeight={"bold"}
                  gap={5}
                  fontSize={24}
                  alignItems={"center"}
                >
                  <Text>{order?.departure_country_code}</Text>
                  <Image src="/src/assets/flight.svg" />
                  <Text>{order?.arrival_country_code}</Text>
                </Flex>
                <Text>{order?.merchant_name}</Text>
              </Box>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                px={3}
                py={2}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={{ base: "space-between" }}
                  w={{ base: "full", md: "40%" }}
                  gap={{ base: 2, md: 10, lg: 10 }}
                >
                  <Text>Status</Text>
                  <Box
                    bg={
                      order?.payment_status == "SUCCEEDED"
                        ? "green.500"
                        : "orangeRed"
                    }
                    fontSize={{ base: "12px", md: "14px" }}
                    px={5}
                    py={1}
                    textColor={"white"}
                    rounded={5}
                  >
                    <Text>
                      {
                        status?.find((i) => i?.stats == order?.payment_status)
                          ?.display
                      }
                    </Text>
                  </Box>
                </Flex>
                <Stack display={{ base: "none", md: "block", lg: "block" }}>
                  <Text color={"blue.400"} fontWeight={600}>
                    {order?.payment_status == "SUCCEEDED"
                      ? "View Ticket"
                      : "Payment now"}
                  </Text>
                </Stack>
              </Flex>
            </Box>
          </Box>
        ))
      ) : (
        <Box w="full" my="30%">
          <Text fontSize="x-large" fontWeight={600} align="center">
            No Order created yet...
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default MyBooking;
