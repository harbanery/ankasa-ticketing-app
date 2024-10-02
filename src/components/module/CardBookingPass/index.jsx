import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { formatOrderDate } from "../../../utils/date";

const CardBookingPass = ({ ticket = {} }) => {
  const navigate = useNavigate();

  const DepartureArrival = ({ departureCode, arrivalCode, images }) => (
    <Flex
      alignItems="center"
      gap={{ base: 5, lg: 8 }}
      fontSize={{ base: 20, lg: 26 }}
    >
      <Text as="b">{departureCode}</Text>
      <Image src={images} />
      <Text as="b">{arrivalCode}</Text>
    </Flex>
  );

  const InfoItem = ({ label, value, ...props }) => (
    <GridItem {...props}>
      <Text color="gray.400" fontSize={14}>
        {label}
      </Text>
      <Text textTransform="capitalize">{value}</Text>
    </GridItem>
  );

  return (
    <Flex>
      <Box
        bg="white"
        w={{ base: "", lg: "900px" }}
        maxW={{ base: "auto", lg: "900px" }}
        mx="auto"
        borderRadius={20}
        px={{ base: "20px", lg: "40px" }}
        py={{ base: 5, lg: 10 }}
        fontFamily="Poppins"
      >
        <Flex
          justifyContent={{
            base: "start",
            md: "space-between",
            lg: "space-between",
          }}
          px="10px"
          py={3}
          flexDir={{ base: "row-reverse", md: "row", lg: "row" }}
        >
          <Text fontSize={24} fontWeight={600}>
            Booking Pass
          </Text>
          <Button
            variant="unstyled"
            onClick={() => navigate("/profile/my-booking", { replace: true })}
            transform={{
              base: "",
              md: "rotate(180deg)",
              lg: "rotate(180deg)",
            }}
          >
            <IoMdArrowBack size={20} strokeWidth={100} color="#2395FF" />
          </Button>
        </Flex>
        <Flex
          border="1px solid"
          borderColor="gray.300"
          px={{ base: "17px", lg: "26px" }}
          borderRadius={10}
          flexDir={{ base: "column", md: "row", lg: "row" }}
        >
          <Box py={10} w={{ base: "", md: "60%", lg: "80%" }}>
            <Flex
              alignItems="center"
              gap={{ base: 10, lg: 5 }}
              flexDir={{ base: "column", md: "row", lg: "row" }}
            >
              {ticket && (
                <>
                  <Image maxW="100px" src={ticket?.merchant_image || ""} />
                  <DepartureArrival
                    departureCode={ticket?.departure_country_code}
                    arrivalCode={ticket?.arrival_country_code}
                    images={"/src/assets/flight.svg"}
                  />
                </>
              )}
            </Flex>
            {ticket && (
              <Grid
                templateColumns={{
                  base: "repeat(4, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                }}
                gap={{ base: 4, lg: 6 }}
                mt={{ base: 8, lg: 16 }}
                fontFamily={"Lato"}
              >
                <InfoItem
                  label="Seat"
                  value={ticket?.passenger_seat_code || "-"}
                />
                <InfoItem
                  label="Class"
                  value={ticket?.class_name || "-"}
                  colSpan={{ base: 2, md: 1, lg: 1 }}
                />
                <InfoItem
                  label="Name of Passenger"
                  value={`${ticket?.passenger_name || "-"} (${
                    ticket?.passenger_category
                  })`}
                  display={{ base: "none", lg: "block" }}
                />
                <InfoItem label="Gate" value={ticket?.gate || "-"} />
                <InfoItem
                  label="Name of Passenger"
                  value={`${ticket?.passenger_name || "-"} (${
                    ticket?.passenger_category
                  })`}
                  colSpan={{ base: 4 }}
                  display={{ base: "block", lg: "none" }}
                />
                <InfoItem
                  label="Departure"
                  value={formatOrderDate(ticket?.departure_schedule) || "-"}
                  colSpan={{ base: 4, md: 2, lg: 2 }}
                />
              </Grid>
            )}
          </Box>
          <Box
            display={{ base: "none", md: "block", lg: "block" }}
            w={0.5}
            border="1px"
            borderStyle="dashed"
            borderColor="gray.300"
            position="relative"
          >
            <Stack
              w={5}
              h={5}
              borderBottom="1px solid"
              borderColor="gray.400"
              zIndex={1}
              position="absolute"
              top={-2}
              bg="white"
              left={-2.5}
              borderRadius="full"
            ></Stack>
            <Stack
              w={5}
              h={5}
              borderTop="1px solid"
              borderColor="gray.400"
              zIndex={1}
              position="absolute"
              bottom={-2}
              bg="white"
              left={-2.5}
              borderRadius="full"
            ></Stack>
          </Box>
          {ticket && (
            <Flex
              position={{ base: "static", md: "relative", lg: "relative" }}
              w={{ base: "", md: "200px", lg: "300px" }}
              justifyContent={{ base: "center", lg: "" }}
              py={{ base: 5, lg: 0 }}
            >
              <Flex
                position={{
                  base: "static",
                  md: "absolute",
                  lg: "absolute",
                }}
                right={{ md: 1, lg: 8 }}
                top={{ md: 20, lg: 28 }}
              >
                <QRCode
                  value="https://github.com/dimassagngsptr"
                  size={160}
                  font="Poppins"
                />
              </Flex>
            </Flex>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default CardBookingPass;
