import {
  Box,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <Box w="100%" py={10}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={10}
        w={"80%"}
        mx={"auto"}
      >
        <GridItem>
          <Stack spacing={4} align={{ base: "start", lg: "flex-start" }}>
            <Image src="/src/assets/brandicon.png" />
            <Text textAlign={{ base: "start", lg: "left" }}>
              Find your Flight and explore the world with us. We will take care
              of the rest
            </Text>
            <Text
              mt={"150px"}
              display={{ base: "none", lg: "block" }}
              textAlign={{ base: "center", lg: "left" }}
            >
              © Ankasa. All Rights Reserved.
            </Text>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack spacing={4} align={{ base: "start", lg: "flex-start" }}>
            <Text mb={3} fontWeight={600} fontSize={16}>
              Features
            </Text>
            <Flex direction={{ base: "row", lg: "column" }} columnGap={3}>
              <Text mb={3} fontWeight={300} fontSize={16}>
                Find Ticket
              </Text>
              <Text mb={3} fontWeight={300} fontSize={16}>
                My Booking
              </Text>
              <Text mb={3} fontWeight={300} fontSize={16}>
                Chat
              </Text>
              <Text fontWeight={300} fontSize={16}>
                Notification
              </Text>
            </Flex>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack spacing={4} align={{ base: "start", lg: "flex-start" }}>
            <Text fontWeight={600} fontSize={16}>
              Download Ankasa App
            </Text>
            <Flex direction={"column"} rowGap={6}>
              <Image src="/src/assets/apple-store.png" w={164} />
              <Image src="/src/assets/play-store.png" w={164} />
            </Flex>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack spacing={4} align={{ base: "start", lg: "flex-start" }}>
            <Text fontWeight={600} fontSize={16}>
              Follow Us
            </Text>
            <Flex columnGap={4} justify={{ base: "start", lg: "flex-start" }}>
              <Image src="/src/assets/sosmed.png" />
            </Flex>
            <Flex
              mt={{ base: "30px", lg: "200px" }}
              alignItems={"center"}
              columnGap={2}
              justify={{ base: "center", lg: "flex-start" }}
            >
              <IoLocationOutline />
              <Text>Jakarta Indonesia</Text>
            </Flex>
            <Text
              display={{ base: "block", lg: "none" }}
              textAlign={{ base: "center", lg: "left" }}
            >
              © Ankasa. All Rights Reserved.
            </Text>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
