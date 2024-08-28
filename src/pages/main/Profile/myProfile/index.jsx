import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
const MyProfile = () => {
  return (
    <>
      <Box>
        <Text
          font-family={"poppins"}
          fontWeight={500}
          fontSize={"14px"}
          lineHeight={"21px"}
          letterSpacing={5}
          color={"#2395FF"}
        >
          PROFILE
        </Text>
        <Text
          mt={2}
          font-family={"poppins"}
          fontWeight={600}
          fontSize={"24px"}
          lineHeight={"36px"}
        >
          Profile
        </Text>
      </Box>
      <Flex mt={5} flexDir={{ base: "column", md: "row", lg: "row" }}>
        <Box>
          <Text
            fontFamily={"poppins"}
            fontWeight={600}
            fontSize={16}
            lineHeight={"24px"}
          >
            Contact
          </Text>
          <Stack mt={4} p={3}>
            <Text
              fontFamily={"lato"}
              fontWeight={400}
              fontSize={14}
              lineHeight={"16.8px"}
              color={"#9B96AB"}
            >
              Email
            </Text>
            <Input
              type="email"
              variant="flushed"
              placeholder="Enter your email here"
              w={"397px"}
              borderBottom="2px"
              borderBottomColor={"#D2C2FFAD"}
              pl={3}
            />
          </Stack>
          <Stack mt={4} p={3}>
            <Text
              fontFamily={"lato"}
              fontWeight={400}
              fontSize={14}
              lineHeight={"16.8px"}
              color={"#9B96AB"}
            >
              Phone Number
            </Text>
            <Input
              type="tel"
              variant="flushed"
              placeholder="Enter your phone number here"
              w={"397px"}
              borderBottom="2px"
              borderBottomColor={"#D2C2FFAD"}
              pl={3}
            />
          </Stack>
          <Stack
            display={"flex"}
            direction={"row"}
            alignItems={"center"}
            justify={{ base: "start", md: "end", lg: "end" }}
            columnGap={8}
            mt={5}
          >
            <Text
              fontFamily={"poppins"}
              fontWeight={600}
              fontSize={16}
              lineHeight={"24px"}
              align={"right"}
              color={"#2395FF"}
            >
              Account Setting
            </Text>
            <IoIosArrowForward strokeWidth={40} height={10} color="#2395FF" />
            {/* <Image src="/src/assets/btnback.png" width={"10px"} height={"15px"}/> */}
          </Stack>
        </Box>
        <Box>
          <Text
            fontFamily={"poppins"}
            fontWeight={600}
            fontSize={16}
            lineHeight={"24px"}
          >
            Biodata
          </Text>
          <Stack mt={4} p={3}>
            <Text
              fontFamily={"lato"}
              fontWeight={400}
              fontSize={14}
              lineHeight={"16.8px"}
              color={"#9B96AB"}
            >
              Username
            </Text>
            <Input
              type="text"
              variant="flushed"
              placeholder="Enter your username here"
              w={"397px"}
              borderBottom="2px"
              borderBottomColor={"#D2C2FFAD"}
              pl={3}
            />
          </Stack>
          <Stack mt={4} p={3}>
            <Text
              fontFamily={"lato"}
              fontWeight={400}
              fontSize={14}
              lineHeight={"16.8px"}
              color={"#9B96AB"}
            >
              City
            </Text>
            <Input
              type="tel"
              variant="flushed"
              placeholder="Enter your here"
              w={"397px"}
              borderBottom="2px"
              borderBottomColor={"#D2C2FFAD"}
              pl={3}
            />
          </Stack>
          <Stack mt={4} p={3}>
            <Text
              fontFamily={"lato"}
              fontWeight={400}
              fontSize={14}
              lineHeight={"16.8px"}
              color={"#9B96AB"}
            >
              Address
            </Text>
            <Input
              type="text"
              variant="flushed"
              placeholder="Enter your address here"
              w={"397px"}
              borderBottom="2px"
              borderBottomColor={"#D2C2FFAD"}
              pl={3}
            />
          </Stack>
          <Stack mt={4} p={3}>
            <Text
              fontFamily={"lato"}
              fontWeight={400}
              fontSize={14}
              lineHeight={"16.8px"}
              color={"#9B96AB"}
            >
              Post Code
            </Text>
            <Input
              type="text"
              variant="flushed"
              placeholder="Enter your post code here"
              w={"397px"}
              borderBottom="2px"
              borderBottomColor={"#D2C2FFAD"}
              pl={3}
            />
          </Stack>
          <Stack display={"flex"} direction={"row"} justify={"end"}>
            <Button
              mt={5}
              mr={3}
              w={"150px"}
              h={"50px"}
              bgColor={"#2395FF"}
              boxShadow={"0px 0px 25px #2395FF"}
              color={"white"}
              _hover={"none"}
              rounded={10}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default MyProfile;
