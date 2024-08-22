import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

const MyBooking = () => {
  const data = [
    {
      date: "Monday, 20 July '20 - 12.33",
      departure: "IDN",
      arrival: "JPN",
      airlines: "Garuda Indonesia",
      seats: "A-221",
      status: "Waiting payment",
    },
    {
      date: "Monday, 20 July '20 - 12.33",
      departure: "IDN",
      arrival: "JPN",
      airlines: "Garuda Indonesia",
      seats: "A-221",
      status: "Payment",
    },
  ];
  const status = [
    {
      stats: "Waiting payment",
      display: "Waiting for payment",
    },
    {
      stats: "Payment",
      display: "Eticket issued",
    },
  ];
  return (
    <Box fontFamily={"Poppins"}>
      <Box>
        <Text
          font-family={"poppins"}
          fontWeight={500}
          fontSize={"14px"}
          lineHeight={"21px"}
          letterSpacing={5}
          color={"#2395FF"}
        >
          MY BOOKING
        </Text>
        <Text
          mt={2}
          font-family={"poppins"}
          fontWeight={600}
          fontSize={"24px"}
          lineHeight={"36px"}
        >
          My Booking
        </Text>
      </Box>
      {data?.map((item, i) => (
        <Box
          key={i}
          bg={"white"}
          _hover={{ bg: "gray.100" }}
          mt={2}
          cursor={"pointer"}
          rounded={10}
        >
          <Box borderBottom={"1px solid"} borderColor={"gray.200"} py={10} px={3}>
            <Text>{item?.date}</Text>
            <Flex
              fontWeight={"bold"}
              gap={5}
              fontSize={24}
              alignItems={"center"}
            >
              <Text>{item?.departure}</Text>
              <Image src="/src/assets/flight.svg" />
              <Text>{item?.arrival}</Text>
            </Flex>
            <Text>{item?.airlines}</Text>
          </Box>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            px={3}
            py={2}
          >
            <Flex alignItems={"center"} justifyContent={{ base:'space-between' }} w={{ base:'full', md:'40%' }} gap={{ base:2, md:10, lg:10 }}>
              <Text>Status</Text>
              <Box
                bg={item?.status == "Payment" ? "green.500" : "orangeRed"}
                fontSize={{ base:'12px', md:'14px' }}
                px={5}
                py={1}
                textColor={"white"}
                rounded={5}
              >
                <Text>
                  {status?.find((i) => i?.stats == item?.status)?.display}
                </Text>
              </Box>
            </Flex>
            <Button variant={"unstyled"} textColor={"blue.400"} display={{ base:'none', md:'block', lg:'block' }}>
              {item?.status == "Payment" ? "View Ticket" : "Payment now"}
            </Button>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default MyBooking;
