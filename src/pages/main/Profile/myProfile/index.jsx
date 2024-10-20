import { Box, Button, Flex, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import api from "../../../../services/api";
const MyProfile = () => {
  const toast = useToast(); // Initialize toast

  // State to manage form data
  const [profileData, setProfileData] = useState({
    email: "",
    phoneNumber: "",
    username: "",
    city: "",
    address: "",
    postCode: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle form submission with validation
  const handleSubmit = async () => {
    const { email, phoneNumber, username, city, address, postCode } = profileData;

    // Check if any required field is empty
    if (!email && !phoneNumber && !username && !city && !address && !postCode) {
      toast({
        title: "All fields are empty. Please fill in at least one field.",
        status: "error",
        duration: 3000, // Duration in milliseconds
        isClosable: true,
      });
      return;
    }

    try {
      const response = await api.put("customer/profile", profileData);
      toast({
        title: "Profile updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box fontFamily={"poppins"}>
      <Box>
        <Text
          fontWeight={500}
          fontSize={{ base: "12px", md: "14px" }}
          lineHeight={{ base: "18px", md: "21px" }}
          letterSpacing={5}
          color={"#2395FF"}
        >
          PROFILE
        </Text>
        <Text
          mt={2}
          fontWeight={600}
          fontSize={{ base: "20px", md: "24px" }}
          lineHeight={{ base: "30px", md: "36px" }}
        >
          Profile
        </Text>
      </Box>
      <Flex
        mt={5}
        flexDir={{ base: "column", md: "row", lg: "row" }}
        gap={5}
      >
        <Box flex={{ base: "1 1 100%", md: "1" }}>
          <Text
            fontWeight={600}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight={"24px"}
          >
            Contact
          </Text>
          <Stack spacing={4} p={3}>
            <Stack spacing={1}>
              <Text
                fontFamily={"lato"}
                fontWeight={400}
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight={"16.8px"}
                color={"#9B96AB"}
              >
                Email
              </Text>
              <Input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="Enter your email here"
                w={{ base: "100%" }}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack spacing={1}>
              <Text
                fontFamily={"lato"}
                fontWeight={400}
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight={"16.8px"}
                color={"#9B96AB"}
              >
                Phone Number
              </Text>
              <Input
                type="tel"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="Enter your phone number here"
                w={{ base: "100%", md: "100%" }}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justify={{ base: "start", md: "end" }}
            spacing={8}
            mt={5}
          >
            <Text
              fontWeight={600}
              fontSize={{ base: "14px", md: "16px" }}
              lineHeight={"24px"}
              color={"#2395FF"}
            >
              Account Setting
            </Text>
            <IoIosArrowForward strokeWidth={40} height={10} color="#2395FF" />
          </Stack>
        </Box>

        <Box flex={{ base: "1 1 100%", md: "1" }}>
          <Text
            fontWeight={600}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight={"24px"}
          >
            Biodata
          </Text>
          <Stack spacing={4} p={3}>
            <Stack spacing={1}>
              <Text
                fontFamily={"lato"}
                fontWeight={400}
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight={"16.8px"}
                color={"#9B96AB"}
              >
                Username
              </Text>
              <Input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="Enter your username here"
                w={{ base: "100%", md: "100%" }}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack spacing={1}>
              <Text
                fontFamily={"lato"}
                fontWeight={400}
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight={"16.8px"}
                color={"#9B96AB"}
              >
                City
              </Text>
              <Input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="Enter your city here"
                w={{ base: "100%", md: "100%" }}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack spacing={1}>
              <Text
                fontFamily={"lato"}
                fontWeight={400}
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight={"16.8px"}
                color={"#9B96AB"}
              >
                Address
              </Text>
              <Input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="Enter your address here"
                w={{ base: "100%", md: "100%" }}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack spacing={1}>
              <Text
                fontFamily={"lato"}
                fontWeight={400}
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight={"16.8px"}
                color={"#9B96AB"}
              >
                Post Code
              </Text>
              <Input
                type="text"
                name="postCode"
                value={profileData.postCode}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="Enter your post code here"
                w={{ base: "100%" }}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
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
              onClick={handleSubmit} // Attach the handleSubmit function
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default MyProfile;
