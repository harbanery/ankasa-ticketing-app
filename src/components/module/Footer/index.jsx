import { Box, Flex, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <Box w="100%" h={"400px"}>
      <Stack alignItems={"center"}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6} w={"80%"}>
          <GridItem colSpan={2} w="100%" h="10">
            <Box mb={8}>
              <Image src="/src/assets/brandicon.png" />
            </Box>
            <Box mb={52}>
              <Text>Find your Flight and explore the</Text>
              <Text w={96}>world with us. We will take care of the rest</Text>
            </Box>
            <Box mb={36}>© Ankasa. All Rights Reserved.</Box>
          </GridItem>
          <GridItem w="100%" h="10">
            <Stack>
              <Text mb={10} fontWeight={600} fontSize={16}>
                Features
              </Text>
              <Text mb={5} fontWeight={300} fontSize={16}>
                Find Ticket
              </Text>
              <Text mb={5} fontWeight={300} fontSize={16}>
                My Booking
              </Text>
              <Text mb={5} fontWeight={300} fontSize={16}>
                Chat
              </Text>
              <Text fontWeight={300} fontSize={16}>
                Notification
              </Text>
            </Stack>
          </GridItem>
          <GridItem w="100%" h="10">
            <Stack spacing={10}>
              <Text fontWeight={600} fontSize={16} w={"fit-content"}>
                Download Ankasa App
              </Text>
              <Image src="/src/assets/apple-store.png" w={164} />
              <Image src="/src/assets/play-store.png" w={164} />
            </Stack>
          </GridItem>
          <GridItem w="100%" h="10">
            <Text mb={10} fontWeight={600} fontSize={16}>
              Follow Us
            </Text>
            <Image src="/src/assets/sosmed.png" w={164} mb={"236px"} />
            <Flex alignItems={"center"}>
            <IoLocationOutline />
            <Text>Jakarta Indonesia</Text>
            </Flex>
          </GridItem>
          <GridItem w="100%" h="10" />
        </Grid>
      </Stack>
    </Box>
  );
};

export default Footer;
