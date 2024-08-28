import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";
import CardComponent from "../../../components/module/CardDestination";
import CircleCard from "../../../components/base/CircleCard";

const Explore = () => {
  const sliderRef = useRef(null);
  const cardSliderRef = useRef(null);
  const [value, setValue] = React.useState("1");
  const cardData = [
    {
      backgroundImage: "/src/assets/card-tokyo.png",
      airlinesCount: 15,
      city: "Tokyo",
      country: "Japan",
    },
    {
      backgroundImage: "/src/assets/card-tokyo.png",
      airlinesCount: 10,
      city: "Paris",
      country: "France",
    },
    {
      backgroundImage: "/src/assets/card-tokyo.png",
      airlinesCount: 20,
      city: "London",
      country: "UK",
    },
    {
      backgroundImage: "/src/assets/card-tokyo.png",
      airlinesCount: 18,
      city: "New York",
      country: "USA",
    },
    {
      backgroundImage: "/src/assets/card-tokyo.png",
      airlinesCount: 12,
      city: "Sydney",
      country: "Australia",
    },
  ];
  const circleCardData = [
    { image: "/src/assets/circle-cart-paris.png", city: "Paris" },
    { image: "/src/assets/circle-cart-paris.png", city: "Paris" },
    { image: "/src/assets/circle-cart-paris.png", city: "Paris" },
    { image: "/src/assets/circle-cart-paris.png", city: "Paris" },
    { image: "/src/assets/circle-cart-paris.png", city: "Paris" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 769, // Breakpoint untuk perangkat kecil
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const cardSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box minH={"100vh"} mb={32}>
      <Box position={"relative"}>
        <Stack
          direction={{ lg: "row" }}
          justifyContent={{ base: "center", lg: "space-between" }}
        >
          <Box w={{ base: "auto", lg: "50%" }} mt={{ base: 10, lg: "120px" }}>
            <Flex
              columnGap={{ base: 3, lg: 5 }}
              justify={{ base: "space-between", lg: "center" }}
            >
              <Text fontSize={{ base: "5xl", lg: "6xl" }} fontWeight={600}>
                Find Your
              </Text>
              <Text
                fontSize={{ base: "5xl", lg: "6xl" }}
                fontWeight={600}
                color={"#2395FF"}
              >
                Flight
              </Text>
            </Flex>
            <Flex justify={{ base: "start", lg: "center" }}>
              <Text fontSize={"18px"} fontWeight={400} color={"gray"}>
                and explore the world with us
              </Text>
              <Text w={"190px"} display={{ base: "none", lg: "block" }}></Text>
            </Flex>
          </Box>
        </Stack>
        <Box
          position={"absolute"}
          top={{ base: 150, lg: 20 }}
          right={{ base: 0, lg: 0 }}
          w={{ base: "30%", lg: "50%" }}
          alignSelf={{ base: "end", lg: "none" }}
        >
          <Image
            ml={{ base: "none", lg: "auto" }}
            src="/src/assets/bg-landing-1.png"
            width={{ lg: "auto" }}
          />
        </Box>
        <Box position={"absolute"} top={{ base: 220, lg: 390 }}>
          <Image
            src="/src/assets/bg-landing-2.png"
            width={{ base: "50%", lg: "auto" }}
          />
        </Box>
        <Box
          position={"absolute"}
          top={{ base: 825, lg: 740 }}
          right={{ base: 0, lg: 200 }}
        >
          <Image
            src="/src/assets/vector-landing-page.png"
            w={{ base: "110px", lg: "auto" }}
          />
        </Box>
        <Box
          bg={"white"}
          position={"absolute"}
          top={190}
          left={{ base: 55, md: 320, lg: 750 }}
          p={{ base: 2, lg: 5 }}
          boxShadow={"dark-lg"}
          rounded={"xl"}
          w={{ base: "319px", lg: "400px" }}
        >
          <Grid gap={3} mb={{ base: 0, lg: 5 }} p={{ base: 2, lg: 0 }}>
            <Text fontWeight={"600"} align="left">
              Hey,
            </Text>
            <Text fontWeight={"600"} fontSize="2xl" align="left">
              Where you want to go?
            </Text>
            <Link to="#">
              <Stack
                display={"flex"}
                justifyContent={"space-between"}
                direction="row"
                color="#2395FF"
                alignItems={"center"}
              >
                <Text>Recently Searched</Text>
                <Text>{<IoIosArrowForward />}</Text>
              </Stack>
            </Link>
          </Grid>
          <Grid
            mx={"auto"}
            boxShadow="lg"
            rounded={"lg"}
            p={3}
            width={{ base: "263px", lg: "319px" }}
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(3, 1fr)"
            alignItems={"center"}
            mb={5}
          >
            <GridItem>from</GridItem>
            <GridItem />
            <GridItem>to</GridItem>
            <GridItem fontSize="2xl">Medan</GridItem>
            <GridItem mx={"auto"} color={"#2395FF"}>
              {<CgArrowLeft />} {<CgArrowRight />}
            </GridItem>
            <GridItem fontSize="2xl">Tokyo</GridItem>
            <GridItem>indonesia</GridItem>
            <GridItem />
            <GridItem>japan</GridItem>
          </Grid>

          <Stack
            direction="row"
            spacing={4}
            mb={5}
            display={"flex"}
            justifyContent={"center"}
          >
            <Button
              leftIcon={<FaPlaneDeparture />}
              bgColor="#2395FF"
              color={"white"}
              border={"2px"}
              borderColor={"transparent"}
              _hover={{
                bg: "white",
                color: "#2395FF",
                border: "2px",
                borderColor: "#2395FF",
              }}
            >
              One Way
            </Button>
            <Button
              leftIcon={<FaArrowRotateRight />}
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
              Round Trip
            </Button>
          </Stack>
          <Box mb={5} p={{ base: 2, lg: 0 }}>
            <Text color={"gray"} align={"left"}>
              Departure
            </Text>
            <Button mt={2} bg={"white"} variant={"outline"} width="full">
              <Flex w={"full"} justifyContent={"space-between"}>
                <Text>Monday, 31 Juli 2025</Text>
                <Text>{<IoIosArrowForward color="#2395FF" />}</Text>
              </Flex>
            </Button>
          </Box>
          <Box mb={5} p={{ base: 2, lg: 0 }}>
            <Text color={"gray"} align="left">
              How Many Person?
            </Text>
            <Flex columnGap={2} justify={"space-between"} mt={2}>
              <Button w={"full"} bg={"white"} mt={2} variant="outline">
                <Flex w={"full"} justifyContent={"space-between"}>
                  <Text>Child</Text>{" "}
                  <Text>{<IoIosArrowForward color="#2395FF" />}</Text>
                </Flex>
              </Button>
              <Button w={"full"} bg={"white"} mt={2} variant="outline">
                <Flex w={"full"} justifyContent={"space-between"}>
                  <Text>Adult</Text>{" "}
                  <Text>{<IoIosArrowForward color="#2395FF" />}</Text>
                </Flex>
              </Button>
            </Flex>
          </Box>
          <Box mb={5} p={{ base: 2, lg: 0 }}>
            <Text color={"gray"} align="left">
              Which class do you want?
            </Text>
            <RadioGroup mt={3} onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="1">Economy</Radio>
                <Radio value="2">Business</Radio>
                <Radio value="3">Firts Class</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Button
            width="full"
            rightIcon={<CgArrowRight />}
            bgColor="#2395FF"
            color={"white"}
            border={"2px"}
            borderColor={"transparent"}
            _hover={{
              bg: "white",
              color: "#2395FF",
              border: "2px",
              borderColor: "#2395FF",
            }}
          >
            Search Flight
          </Button>
        </Box>
      </Box>
      <Box mt={860} w={"80%"} mx={"auto"}>
        <Box>
          <Text fontSize={"base"} color={"#2395FF"}>
            Trending
          </Text>
        </Box>
        <Flex justify={"space-between"} mb={"40px"}>
          <Text fontSize={"xl"} fontWeight={600}>
            Trending Destinations
          </Text>
          <Link to="#">
            <Text fontWeight={600} color={"#2395FF"}>
              View all
            </Text>
          </Link>
        </Flex>
        <Box mt={10} w={{ base: "60%", md: "80%", lg: "full" }} mx={"auto"}>
          <Slider ref={cardSliderRef} {...cardSettings}>
            {cardData.map((card, index) => (
              <CardComponent
                key={index}
                backgroundImage={card.backgroundImage}
                airlinesCount={card.airlinesCount}
                city={card.city}
                country={card.country}
              />
            ))}
          </Slider>
        </Box>
      </Box>
      <Box
        bgColor={"#2395FF"}
        mt={32}
        w={"80%"}
        h={"550px"}
        mx={"auto"}
        rounded={60}
        position={"relative"}
      >
        <Image
          position={"absolute"}
          bottom={0}
          src="/src/assets/ilustration2.png"
        />
        <Box position={"relative"} top={16}>
          <Stack alignItems={"center"} py={"auto"} color={"white"}>
            <Text fontWeight={500}>TOP 10</Text>
            <Text fontWeight={600} fontSize={"2xl"}>
              Top 10 destinations
            </Text>
            <Box mt={10} w={"full"}>
              <Slider ref={sliderRef} {...settings}>
                {circleCardData.map((data, index) => (
                  <CircleCard key={index} image={data.image} city={data.city} />
                ))}
              </Slider>
            </Box>
            <Flex columnGap={5}>
              <Button
                _hover={{ bg: "#2395FF", color: "white" }}
                mt={10}
                bgColor={"white"}
                variant="outline"
                border="2px"
                borderColor="white"
                color="#2395FF"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <IoIosArrowBack width={30} />
              </Button>
              <Button
                _hover={{ bg: "#2395FF", color: "white" }}
                mt={10}
                bgColor={"white"}
                variant="outline"
                border="2px"
                borderColor="white"
                color="#2395FF"
                onClick={() => sliderRef.current.slickNext()}
              >
                <IoIosArrowForward width={30} />
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Explore;
