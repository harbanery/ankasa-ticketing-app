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
import { IoMdArrowBack } from "react-icons/io";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

const BoardingPass = ({ checkout }) => {
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

  const InfoItem = ({ label, value }) => (
    <GridItem>
      <Text color="gray.400" fontSize={14}>
        {label}
      </Text>
      <Text>{value}</Text>
    </GridItem>
  );

  return (
    <Box bg="#2395FF" py={10} px={{ base: "10px" }}>
      <Box
        bg="white"
        w={{ base: "", lg: "900px" }}
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
          <Button variant="unstyled" onClick={() => navigate("/")}>
            <IoMdArrowBack size={20} color="#2395FF" />
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
              {checkout && (
                <>
                  <Image src={checkout[0]?.tickets[0]?.merchant[0]?.images} />
                  <DepartureArrival
                    departureCode={
                      checkout[0]?.tickets[0]?.departure[0]?.cities[0]
                        ?.countries[0]?.code
                    }
                    arrivalCode={
                      checkout[0]?.tickets[0]?.arrivals[0]?.cities[0]
                        ?.countries[0]?.code
                    }
                    images={"/src/assets/flight.svg"}
                  />
                </>
              )}
            </Flex>
            {checkout && (
              <Grid
                templateColumns={{
                  base: "repeat(4, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                }}
                gap={{ base: 4, lg: 6 }}
                mt={{ base: 8, lg: 16 }}
              >
                <InfoItem
                  label="Seats"
                  value={checkout[0]?.details
                    ?.map((item) => item?.seats)
                    .join(", ")}
                />
                <InfoItem
                  label="Class"
                  value={checkout[0]?.tickets[0]?.class}
                />
                <InfoItem
                  label="Passengers"
                  value={checkout[0]?.total_passegers}
                />
                <InfoItem label="Gate" value={checkout[0]?.tickets[0]?.gate} />
                <GridItem colSpan={{ base: 4, md: 2, lg: 2 }}>
                  <Text color="gray.400" fontSize={14}>
                    Departure
                  </Text>
                  <Text>{checkout[0]?.tickets[0]?.departure[0]?.schedule}</Text>
                </GridItem>
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
          {checkout && (
            <Flex
              position={{ base: "static", md: "relative", lg: "relative" }}
              w={{ base: "", md: "200px", lg: "300px" }}
              justifyContent={{ base: "center", lg: "" }}
              py={{ base: 5, lg: 0 }}
            >
              <Flex
                position={{ base: "static", md: "absolute", lg: "absolute" }}
                right={{ md: -8, lg: 8 }}
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
    </Box>
  );
};

export default BoardingPass;
