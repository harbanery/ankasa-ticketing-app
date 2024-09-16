/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import api from "../../../services/api";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";

const ProfileMobile = ({
  isOpen,
  handleClick,
  activeIndex,
  activeColor,
  defaultColor,
  profile,
  isActive,
}) => {
  return (
    <Collapse
      in={isOpen}
      animateOpacity
      display={{ base: "block", md: "none", lg: "none" }}
    >
      <Box
        bgColor={"white"}
        w={{ base: "full", md: "325px", lg: "325px" }}
        h={"710px"}
        rounded={15}
        p={8}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          rowGap={8}
        >
          <Box borderRadius="full" border="4px" borderColor="#2395FF" p={2}>
            <Image
              boxSize={{ base: "100px", lg: "150px" }}
              src={profile.image}
              alt="Dan Abramov"
              rounded="full"
            />
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
            <Flex alignItems={"center"} columnGap={2}>
              <IoLocationSharp color="#2395FF" size={24} />
              <Text
                fontWeight={400}
                fontSize={"14px"}
                fontFamily={"lato"}
                color={"#6B6B6B"}
                lineHeight={"22px"}
              >
                {profile.city}, Indonesia
              </Text>
            </Flex>
          </Box>
        </Box>
        <Flex
          flexDir={{ base: "column-reverse", md: "column", lg: "column" }}
          alignItems={{ base: "center", md: "start", lg: "start" }}
        >
          <Box>
            <Flex
              justify={{
                base: "start",
                md: "space-between",
                lg: "space-between",
              }}
              mt={5}
              alignItems={"center"}
            >
              <Text
                fontFamily={"poppins"}
                fontWeight={600}
                fontSize={"14px"}
                lineHeight={"22px"}
              >
                Wallets
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
                + Top Up
              </Button>
            </Flex>
            <Flex
              flexDir={"column"}
              justifyContent={"space-between"}
              w={"267px"}
              h={"68px"}
              rounded={"10px"}
              bgColor={"#2395FF"}
              boxShadow={"0px 7px 25px #2395FF"}
              px={4}
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
                Rp.50.000
              </Text>
              <Flex justifyContent={"space-between"}>
                <Text
                  fontWeight={400}
                  fontSize={"12px"}
                  fontFamily={"poppins"}
                  color={"#AEFAFF"}
                  lineHeight={"22px"}
                >
                  {profile.username}
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"11px"}
                  fontFamily={"poppins"}
                  color={"#AEFAFF"}
                  lineHeight={"22px"}
                >
                  Ankasapay
                </Text>
              </Flex>
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
              color={isActive ? activeColor : defaultColor}
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
              color={isActive ? activeColor : defaultColor}
              cursor="pointer"
            >
              <Link to="/profile/my-profile">Profile</Link>
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
        </Flex>
      </Box>
    </Collapse>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const { isOpen, onToggle } = useDisclosure();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false)
  // toast({
  //   title: "Profile photo updated successfully.",
  //   status: "success",
  //   duration: 3000,
  //   isClosable: true,
  // });
  useEffect(() => {
    api
      .get("customer/profile")
      .then((res) => {
        setProfile(res.data.data);
        console.log("data: ", res.data.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const isActive = location.pathname === "/profile/my-profile";

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const defaultColor = "#000"; // Warna default ketika tidak aktif
  const activeColor = "#2395FF"; // Warna ketika aktif

  const handleChangeImage = (e) => {
    setLoading(true)
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Membuat URL preview dari file yang dipilih
      setLoading(false)
    }
  };

  const handleUploadImage = async () => {
    setLoading(true)
    if (!image) {
      toast({
        title: "Select ad image to upload",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false)
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Upload image logic here...
      const response = await api.post(
        "customer/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: response.data.image, // Menggunakan URL dari hasil upload
        }));
        setLoading(false)
        toast({
          title: "Profile photo updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("Photo uploaded successfully:", response.data);
      }
    } catch (error) {
      setLoading(false)
      toast({
        title: "Failed to upload image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error uploading photo:", error);
    }
  };
  return (
    <Flex
      bgColor={{ base: "white", md: "#F5F6FA" }}
      columnGap={5}
      p={10}
      justify={"center"}
      flexDir={{ base: "column", md: "row", lg: "row" }}
    >
      <Button
        onClick={onToggle}
        variant={"unstyled"}
        display={{ base: "block", md: "none", lg: "none" }}
        bg={"white"}
      >
        Click Me
      </Button>
      <ProfileMobile
        isOpen={isOpen}
        activeColor={activeColor}
        activeIndex={activeIndex}
        defaultColor={defaultColor}
        handleClick={handleClick}
        profile={profile}
        isActive={isActive}
      />
      <Box
        display={{ base: "none", md: "block", lg: "block" }}
        bgColor={"white"}
        w={{ base: "full", md: "325px", lg: "325px" }}
        h={"710px"}
        rounded={15}
        p={8}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          rowGap={8}
        >
          <Box borderRadius="full" border="4px" borderColor="#2395FF" p={2}>
            <Image
              boxSize="150px"
              src={preview || profile.image || "/src/assets/profile.png"} // Replace with dynamic profile image source
              alt="Profile Photo"
              rounded="full"
              objectFit={"cover"}
            />
          </Box>
          <Button
            as="label" // This allows the button to function as a label for the input
            isLoading={loading}
            loadingText="Process..."
            htmlFor="file-upload"
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
            display={!image ? "inline-flex" : "none"}
            flexDirection="column"
          >
            Select Photo<Text fontSize={9}> Max 2 MB</Text>
            
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              style={{ display: "none" }} // Hide the default input
            />
          </Button>
          <Button
          isLoading={loading}
          loadingText="Process..."
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
            onClick={handleUploadImage} // Trigger upload when the button is clicked
            display={image ? "block" : "none"}
          >
            Upload Photo
          </Button>
          <Box>
            <Text
              align={"center"}
              fontWeight={600}
              fontSize={"20px"}
              fontFamily={"poppins"}
            >
              {profile?.username}
            </Text>
            <Flex alignItems={"center"} columnGap={2}>
              <IoLocationSharp color="#2395FF" size={24} />
              <Text
                fontWeight={400}
                fontSize={"14px"}
                fontFamily={"lato"}
                color={"#6B6B6B"}
                lineHeight={"22px"}
              >
                {profile.city}, Indonesia
              </Text>
            </Flex>
          </Box>
        </Box>
        <Flex
          flexDir={{ base: "column-reverse", md: "column", lg: "column" }}
          alignItems={{ base: "center", md: "start", lg: "start" }}
        >
          <Box>
            <Flex
              justify={{
                base: "start",
                md: "space-between",
                lg: "space-between",
              }}
              mt={5}
              alignItems={"center"}
            >
              <Text
                fontFamily={"poppins"}
                fontWeight={600}
                fontSize={"14px"}
                lineHeight={"22px"}
              >
                Wallets
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
                + Top Up
              </Button>
            </Flex>
            <Flex
              flexDir={"column"}
              justifyContent={"space-between"}
              w={"267px"}
              h={"68px"}
              rounded={"10px"}
              bgColor={"#2395FF"}
              boxShadow={"0px 7px 25px #2395FF"}
              px={4}
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
                Rp.50.000
              </Text>
              <Flex justifyContent={"space-between"}>
                <Text
                  fontWeight={400}
                  fontSize={"12px"}
                  fontFamily={"poppins"}
                  color={"#AEFAFF"}
                  lineHeight={"22px"}
                >
                  {profile.username}
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"11px"}
                  fontFamily={"poppins"}
                  color={"#AEFAFF"}
                  lineHeight={"22px"}
                >
                  Ankasapay
                </Text>
              </Flex>
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
              color={isActive ? activeColor : defaultColor}
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
              color={isActive ? activeColor : defaultColor}
              cursor="pointer"
            >
              <Link to="/profile/my-profile">Profile</Link>
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
        </Flex>
      </Box>
      <Box
        bgColor={"white"}
        w={{ base: "", md: "876px", lg: "876px" }}
        rounded={15}
        py={8}
        px={6}
      >
        <Outlet></Outlet>
      </Box>
    </Flex>
  );
};

export default Profile;
