/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowForward, IoMdSettings } from "react-icons/io";
import api from "../../../services/api";

const Profile = () => {
    const [profile, setProfile] = useState([])
    useEffect(()=>{
        api.get('customer/profile')
        .then((res)=>{
          setProfile(res.data.data)
          console.log("data",res.data.data);
        })
        .catch((err)=>{
          console.log(err);
        })
    },[])
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const defaultColor = "#000"; // Warna default ketika tidak aktif
  const activeColor = "#2395FF"; // Warna ketika aktif
  return (
    <Flex
      bgColor={{ base: "white", md: "#F5F6FA" }}
      columnGap={5}
      p={10}
      justify={"center"}
      direction={{base: "column", md: "row"}}
    >
      <Box bgColor={"white"} w={"325px"} h={"710px"} rounded={15} p={8}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          rowGap={8}
        >
          <Box borderRadius="full" border="4px" borderColor="#2395FF" p={2}>
            <Image boxSize={{base: "100px",lg: "150px"}} src={profile.image} alt="Dan Abramov" rounded="full" />
          </Box>
          <Button
            w={"150px"}
            h={"50px"}
            bgColor="white"
            color={"#2395FF"}
            border={"2px"}
            borderColor={"#2395FF"}
            _hover={{
              bg: "#2395FF",
              color: "white",
              border: "2px",
              borderColor: "white",
            }}
          >
            Select Photo
          </Button>
          <Box>
            <Text
              align={"center"}
              fontWeight={600}
              fontSize={"20px"}
              fontFamily={"poppins"}
              textTransform={"capitalize"}
            >
              {profile.username}
            </Text>
            <Text
              fontWeight={400}
              fontSize={"14px"}
              fontFamily={"lato"}
              color={"#6B6B6B"}
              lineHeight={"22px"}
              textAlign={"center"}
            >
              Surakarta Indonesia
            </Text>
          </Box>
        </Box>
        <Flex justify={"space-between"} mt={5} alignItems={"center"}>
          <Text
            fontFamily={"poppins"}
            fontWeight={600}
            fontSize={"14px"}
            lineHeight={"22px"}
          >
            Cards
          </Text>
          <Button
            bgColor={"transparent"}
            _hover={"none"}
            fontFamily={"poppins"}
            fontWeight={600}
            fontSize={"14px"}
            lineHeight={"22px"}
            color={"#2395FF"}
          >
            + Add
          </Button>
        </Flex>
        <Box
          w={{base: "260px",lg: "267px"}}
          h={"68px"}
          rounded={"10px"}
          bgColor={"#2395FF"}
          boxShadow={"0px 0px 25px #2395FF"}
          px={5}
          py={2}
        >
          <Text
            fontWeight={600}
            fontSize={"14px"}
            fontFamily={"poppins"}
            color={"white"}
            lineHeight={"22px"}
            letterSpacing={"1.5px"}
          >
            4441 1235 5512 5551
          </Text>
          <Flex justifyContent={"space-between"}>
            <Text
              fontWeight={400}
              fontSize={"12px"}
              fontFamily={"poppins"}
              color={"#AEFAFF"}
              lineHeight={"22px"}
            >
              X Card
            </Text>
            <Text
              fontWeight={400}
              fontSize={"12px"}
              fontFamily={"poppins"}
              color={"#AEFAFF"}
              lineHeight={"22px"}
            >
              X Card
            </Text>
          </Flex>
        </Box>
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(4, 1fr)"
          gap={2}
          px={3}
          py={3}
          alignItems={"center"}
          rowGap={5}
          mt={5}
        >
          <GridItem
            colSpan={1}
            onClick={() => handleClick(0)}
            color={activeIndex === 0 ? activeColor : defaultColor}
            cursor="pointer"
          >
            <FaRegUserCircle w={"20px"} h={"20px"} />
          </GridItem>
          <GridItem
            colSpan={2}
            fontWeight={600}
            fontFamily={"poppins"}
            fontSize={"14px"}
            lineHeight={"22px"}
            onClick={() => handleClick(0)}
            color={activeIndex === 0 ? activeColor : defaultColor}
            cursor="pointer"
          >
            Profile
          </GridItem>
          <GridItem
            colSpan={1}
            onClick={() => handleClick(1)}
            color={activeIndex === 1 ? activeColor : defaultColor}
            cursor="pointer"
          >
            <FaStar w={"20px"} h={"18px"} />
          </GridItem>
          <GridItem
            colSpan={2}
            fontWeight={600}
            fontFamily={"poppins"}
            fontSize={"14px"}
            lineHeight={"22px"}
            onClick={() => handleClick(1)}
            color={activeIndex === 1 ? activeColor : defaultColor}
            cursor="pointer"
          >
            My Review
          </GridItem>
          <GridItem
            colSpan={1}
            onClick={() => handleClick(2)}
            color={activeIndex === 2 ? activeColor : defaultColor}
            cursor="pointer"
          >
            <IoMdSettings w={"20px"} h={"21px"} />
          </GridItem>
          <GridItem
            colSpan={2}
            fontWeight={600}
            fontFamily={"poppins"}
            fontSize={"14px"}
            lineHeight={"22px"}
            onClick={() => handleClick(2)}
            color={activeIndex === 2 ? activeColor : defaultColor}
            cursor="pointer"
          >
            Settings
          </GridItem>
          <GridItem
            colSpan={1}
            onClick={() => handleClick(3)}
            color={activeIndex === 3 ? activeColor : defaultColor}
            cursor="pointer"
          >
            <Image src="/src/assets/logout.png" w={"20px"} h={"18px"} />
          </GridItem>
          <GridItem
            colSpan={2}
            fontWeight={600}
            fontFamily={"poppins"}
            fontSize={"14px"}
            lineHeight={"22px"}
            cursor="pointer"
            color={"#F24545"}
          >
            Logout
          </GridItem>
        </Grid>
      </Box>
      <Box bgColor={"white"} w={{lg: "876px"}} h={{lg: "650px"}} rounded={15} py={{base: 0,md: 8}} px={{base: 0,md: 6}}>
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
        <Flex mt={5} direction={{base:"column", lg:"row"}}>
          <Box mb={9}>
            <Text
              fontFamily={"poppins"}
              fontWeight={600}
              fontSize={16}
              lineHeight={"24px"}
            >
              Contact
            </Text>
            <Stack mt={4} p={{base: 0,lg: 3}}>
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
                w={{base: 300,lg: "397px"}}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack mt={4} p={{base: 0,lg: 3}}>
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
                w={{base: 300,lg: "397px"}}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack
              display={"flex"}
              direction={"row"}
              alignItems={"center"}
              justify={{base: "start",lg: "end"}}
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
            <Stack mt={4} p={{base: 0,lg: 3}}>
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
                w={{base: 300,lg: "397px"}}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack mt={4} p={{base: 0,lg: 3}}>
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
                w={{base: 300,lg: "397px"}}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack mt={4} p={{base: 0,lg: 3}}>
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
                w={{base: 300,lg: "397px"}}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack mt={4} p={{base: 0,lg: 3}}>
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
                w={{base: 300,lg: "397px"}}
                borderBottom="2px"
                borderBottomColor={"#D2C2FFAD"}
                pl={3}
              />
            </Stack>
            <Stack display={"flex"} direction={"row"} justify={{base: "start",lg: "end"}}>
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
      </Box>
    </Flex>
  );
};

export default Profile;
