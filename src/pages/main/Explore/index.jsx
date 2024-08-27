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
import { FaArrowRightArrowLeft, FaArrowRotateRight } from "react-icons/fa6";
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
      backgroundImage:
        "https://s3-alpha-sig.figma.com/img/206e/fc86/f01e0ab7c33981f586273a726b9e138f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LPBoB91Apbv21a8-x031xV5yX6ZRFjVR23GG9qllmDTQjsM0jNJ8wFMrv1p0uCoLztWbizaUB-CYc19PtLI9Y-Aauvlj5AW1WziwcstqkAKbRKwfDGLJUDvyiumhPc3HKhdAYJehoXh-vaPz0QJbyeFoULBVMQzi1fGQGpJ~q8rKwVl7sHwBg1uHcnZkRmfKOyrtrWQEnnBzLYHk0qxaiuFiFG4m~B6FA6sr-rnI~NUBsOaU4-vNyFaxn0y8fq5fZjluKX~i2V2T-ASBh8OFKucIy1USzccg8xuTFKuLEEkvJvFokymIRJVTwiENtW1-LVlzkcDZj-269XEYtfwOJg__",
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
      backgroundImage:
        "https://s3-alpha-sig.figma.com/img/5488/9a28/9b060c3c677b45325ae88be1f3b5ca75?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dHG3hAXLnPdTJ1y5dbHDH5pK9Lf0t2aAWjEO352FMerMyfaME0ie5FLLT-url9mUyVAHbRj4pajHbuD3CqPsekJJjjuLzCzz8wFIJuSje4O6S3QKfJpdDVwiK5KkYw3rnOKE8~gkn95xjtkDUSKsH52XsSd-qLV7dI5TWlFiquQaNeOx6wmvJTz1-HdXLcIPYVVMSZfEXkmWJdGqIV1JFY30LibtU27qEm2NB28m8Eljcy1l8gW8shEHzUp2IPWq7E7ieHPlupcQL~iOhx3EtI798X-RmdzGwSKuYRcd7Mxfmw5xjuE96IHr~DNzsVIBCQKXUQlXLOtJAvX-fogJdw__",
      airlinesCount: 12,
      city: "Sydney",
      country: "Australia",
    },
    {
      backgroundImage: "/src/assets/card-tokyo.png",
      airlinesCount: 18,
      city: "New York",
      country: "USA",
    },
    {
      backgroundImage:
        "https://s3-alpha-sig.figma.com/img/0834/6daa/153e1610c5b2dc54dbd24db8a2251fc8?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A4lntL3h7jDXiyOLaiy58j8A7seWxbUSfmsp64tJIk-H~DHwjLk2KmwQlUgwvFasUrFyXWg~90gCYoA3IKRiBf-pJwEnygrtRabX4eRZYohb5~gt6qd-pg7CH0Baz4ck3iyWrqpLeA53ADE2JzlljR1fu2SeWPvrVKvmnQqkE-mX1UAGYrB5FeexPXdKurJk8mA5n2v4LgDtsquZEYKRU8va1uf14pfoOxy6Sw7hJcgAqdnA5XBLzPT5~qILTCFyfFV4GB2bIpSwVfgKQhb5LCEo38NNbnWx2kbX3oi4CMjxSiQDmcCMx3EeiVT2t3a1olyYPp68NeWzGl2VGYIXpA__",
      airlinesCount: 10,
      city: "Barcelona",
      country: "Spain",
    },
    {
      backgroundImage:
        "https://s3-alpha-sig.figma.com/img/0656/5c4d/b656f5710f5e0f053aa347575fbc57a0?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Rzg75UjdbZ3okMWWhD-fvol15kkYQU6MwIc7hzfW8ei843Tf6lNWA02DJ7dihj9ogfgaP2-eOctXToKeaRiS721qkfYrjqm~bS95Sa9~jT8I6wUPsOlQAQKkeOtbToLw4~MGlEQZYsQyOibUXq05gpEBNRaLVNYa9602AXfmHLm-LCfO8DhSpYDpZM1zNg~akdjKGP-tVZjusqvKQANzc5UQl6oGSsS74uJVsXMgxht094T9GeJvnFaMU7SHeUha5ZwIuGtL3WYQn93G-vz3AXmJE-rQbJrEpZrguwgcBGhv-LsGnM0pnhXhdBe0shnVh3J5P2gCZEt2biwuY26BiA__",
      airlinesCount: 6,
      city: "Bali",
      country: "Indonesia",
    },
  ];
  const circleCardData = [
    {
      image:
        "https://s3-alpha-sig.figma.com/img/206e/fc86/f01e0ab7c33981f586273a726b9e138f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LPBoB91Apbv21a8-x031xV5yX6ZRFjVR23GG9qllmDTQjsM0jNJ8wFMrv1p0uCoLztWbizaUB-CYc19PtLI9Y-Aauvlj5AW1WziwcstqkAKbRKwfDGLJUDvyiumhPc3HKhdAYJehoXh-vaPz0QJbyeFoULBVMQzi1fGQGpJ~q8rKwVl7sHwBg1uHcnZkRmfKOyrtrWQEnnBzLYHk0qxaiuFiFG4m~B6FA6sr-rnI~NUBsOaU4-vNyFaxn0y8fq5fZjluKX~i2V2T-ASBh8OFKucIy1USzccg8xuTFKuLEEkvJvFokymIRJVTwiENtW1-LVlzkcDZj-269XEYtfwOJg__",
      city: "Paris",
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/0656/5c4d/b656f5710f5e0f053aa347575fbc57a0?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Rzg75UjdbZ3okMWWhD-fvol15kkYQU6MwIc7hzfW8ei843Tf6lNWA02DJ7dihj9ogfgaP2-eOctXToKeaRiS721qkfYrjqm~bS95Sa9~jT8I6wUPsOlQAQKkeOtbToLw4~MGlEQZYsQyOibUXq05gpEBNRaLVNYa9602AXfmHLm-LCfO8DhSpYDpZM1zNg~akdjKGP-tVZjusqvKQANzc5UQl6oGSsS74uJVsXMgxht094T9GeJvnFaMU7SHeUha5ZwIuGtL3WYQn93G-vz3AXmJE-rQbJrEpZrguwgcBGhv-LsGnM0pnhXhdBe0shnVh3J5P2gCZEt2biwuY26BiA__",
      city: "Bali",
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/91eb/c3b9/e985416af059aab94180bce2220da23c?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gFso4Fi-j-cDRRLtDLhaWLrpXoIJUIO~-l6zPhzQtMGih44nbJRxedYFGEfLh4DsbH2kIHQU3N~0He7aSdtJBX3eioys2PyMP0UAXZvAlJtJbms3WQsz342eusS~DqUUz6bDYf1aLioV4ZYF0zL77mwjRZh7n6tjLZvhyUyfEzYUmB~CCOwRTBW20ll~73EGvxbXBg~tvgc3lGU7oU6KwTvo4MoBbtTNj9D~RtrluXGVN-0yv9WOt~y4hJdea~yHJlL1nup01RbdSZys6p4PGUJfrA7G9zog8FmlcNWPCg~M1Wq6xF1cjeOy-pKHLNHDKiuXWBYxrPEdU7TSrW3KXQ__",
      city: "Singapore",
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/4f0c/47fb/1f1da0e001b9cd0c4e008cc969ae45c9?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IiWOos7uvE6u5-rUR4TQ4d1cbujdhOu8RsCqUG58hbIyNK0BtRaqooGw2tuI2yphcCWMtlIlLtdO-hFHVquE0~vYmRB2xgXpx2P72rgkcgQ~c88I-JWSgV2~cXGspjAI7fyUivgvYkbcqJ8uNovvjKfJkU9SsSAmJl89RpypSPiZnB7k2-V4zxVTLiI-kpBIUytsmIcS7xWSTeBI8NhFeFpz4rZXAyJEitzqBQRmQLFKfjrxyaTpZmBxK-oIJ8-lvAblzuHBTqo9N8Fp-xXYRvGvAsoO4OvKxK54xfYs-WvQIJjv5pkfbNRhCMMJB3fanDIjRFb0ZOoU3yZktoWGLQ__",
      city: "Agra",
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/5488/9a28/9b060c3c677b45325ae88be1f3b5ca75?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dHG3hAXLnPdTJ1y5dbHDH5pK9Lf0t2aAWjEO352FMerMyfaME0ie5FLLT-url9mUyVAHbRj4pajHbuD3CqPsekJJjjuLzCzz8wFIJuSje4O6S3QKfJpdDVwiK5KkYw3rnOKE8~gkn95xjtkDUSKsH52XsSd-qLV7dI5TWlFiquQaNeOx6wmvJTz1-HdXLcIPYVVMSZfEXkmWJdGqIV1JFY30LibtU27qEm2NB28m8Eljcy1l8gW8shEHzUp2IPWq7E7ieHPlupcQL~iOhx3EtI798X-RmdzGwSKuYRcd7Mxfmw5xjuE96IHr~DNzsVIBCQKXUQlXLOtJAvX-fogJdw__",
      city: "Sydney",
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/0834/6daa/153e1610c5b2dc54dbd24db8a2251fc8?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A4lntL3h7jDXiyOLaiy58j8A7seWxbUSfmsp64tJIk-H~DHwjLk2KmwQlUgwvFasUrFyXWg~90gCYoA3IKRiBf-pJwEnygrtRabX4eRZYohb5~gt6qd-pg7CH0Baz4ck3iyWrqpLeA53ADE2JzlljR1fu2SeWPvrVKvmnQqkE-mX1UAGYrB5FeexPXdKurJk8mA5n2v4LgDtsquZEYKRU8va1uf14pfoOxy6Sw7hJcgAqdnA5XBLzPT5~qILTCFyfFV4GB2bIpSwVfgKQhb5LCEo38NNbnWx2kbX3oi4CMjxSiQDmcCMx3EeiVT2t3a1olyYPp68NeWzGl2VGYIXpA__",
      city: "Barcelona",
    },
  ];

  function SampleNextArrow() {
    return <div style={{ display: "none" }} />;
  }

  function SamplePrevArrow() {
    return <div style={{ display: "none" }} />;
  }

  const cardSettings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: cardData.length > 5 ? 5 : cardData.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: cardData.length > 4 ? 4 : cardData.length,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cardData.length > 3 ? 3 : cardData.length,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: cardData.length > 2 ? 2 : cardData.length,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: cardData.length > 1 ? 1 : cardData.length,
        },
      },
    ],
  };

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: circleCardData.length > 5 ? 5 : circleCardData.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: circleCardData.length > 4 ? 4 : circleCardData.length,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: circleCardData.length > 3 ? 3 : circleCardData.length,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: circleCardData.length > 2 ? 2 : circleCardData.length,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: circleCardData.length > 1 ? 1 : circleCardData.length,
        },
      },
    ],
  };
  return (
    <Box minH={"100vh"} mb={32} fontFamily={"Poppins"}>
      <Box position={"relative"}>
        <Stack
          direction={{ lg: "row" }}
          justifyContent={{ base: "center", lg: "space-between" }}
        >
          <Box
            w={{ base: "auto", lg: "50%" }}
            mt={{ base: 10, lg: "120px" }}
            ml={{ base: "0", lg: "5%", xl: "130px" }}
          >
            <Flex
              columnGap={{ base: 3, lg: 5 }}
              justify={{ base: "space-between", lg: "start" }}
            >
              <Text
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight={600}
              >
                Find Your
              </Text>
              <Text
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight={600}
                color={"#2395FF"}
              >
                Flight
              </Text>
            </Flex>
            <Flex justify={{ base: "start" }}>
              <Text fontSize={"18px"} fontWeight={400} color={"gray"}>
                and explore the world with us
              </Text>
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
            // background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.81) 100%);
          />
        </Box>
        <Box position={"absolute"} top={{ base: 800, md: 700, lg: 390 }}>
          <Image
            src="/src/assets/bg-landing-2.png"
            width={{ base: "50%", lg: "auto" }}
          />
        </Box>
        <Box
          position={"absolute"}
          top={{ base: 825, lg: 810, xl: 740 }}
          right={{ base: 0, md: 75, lg: 25, xl: 200 }}
        >
          <Image
            src="/src/assets/vector-landing-page.png"
            w={{ base: "110px", xl: "auto" }}
          />
        </Box>
        <Box
          bg={"white"}
          position={"absolute"}
          top={190}
          right={{ base: "7%", md: "16%", lg: "7%", xl: "23%", "2xl": "30%" }}
          p={{ base: 2, lg: 5 }}
          boxShadow={"dark-lg"}
          rounded={"xl"}
          w={{ base: "319px", lg: "400px" }}
        >
          <Grid gap={3} mb={{ base: 0, lg: 5 }} p={{ base: 2, lg: 0 }}>
            <Text fontWeight={"500"} align="left">
              Hey,
            </Text>
            <Text fontWeight={"500"} fontSize="2xl" align="left">
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
            <GridItem fontFamily="Lato" color="#979797" fontSize="small">
              From
            </GridItem>
            <GridItem />
            <GridItem fontFamily="Lato" color="#979797" fontSize="small">
              To
            </GridItem>
            <GridItem fontSize="2xl" fontWeight={600}>
              Medan
            </GridItem>
            <GridItem mx={"auto"} color={"#2395FF"}>
              <FaArrowRightArrowLeft fontSize="17px" />
            </GridItem>
            <GridItem fontSize="2xl" fontWeight={600}>
              Tokyo
            </GridItem>
            <GridItem
              alignSelf="start"
              fontFamily="Lato"
              fontWeight={500}
              fontSize="14px"
            >
              Indonesia
            </GridItem>
            <GridItem />
            <GridItem
              alignSelf="start"
              fontFamily="Lato"
              fontWeight={500}
              fontSize="14px"
            >
              Japan
            </GridItem>
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
          <Text
            fontSize={"base"}
            color={"#2395FF"}
            letterSpacing={5}
            textTransform="uppercase"
          >
            Trending
          </Text>
        </Box>
        <Flex justify={"space-between"} mb={"40px"}>
          <Text fontSize={"xl"} fontWeight={600} textTransform="capitalize">
            Trending Destinations
          </Text>
          <Link to="#">
            <Text fontWeight={600} color={"#2395FF"}>
              View all
            </Text>
          </Link>
        </Flex>
        <Box mt={10} w={{ base: "full", lg: "full" }} mx={"auto"}>
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
        mx={"auto"}
        px={{ base: 0, md: 12, xl: 24, "2xl": 60 }}
        py={"67px"}
        rounded={60}
        position={"relative"}
      >
        <Image
          w="45%"
          position={"absolute"}
          roundedBottomLeft={60}
          bottom={0}
          left={0}
          src="/src/assets/ilustration2.png"
        />
        <Box position={"relative"}>
          <Stack alignItems={"center"} py={"auto"} color={"white"}>
            <Text fontWeight={500} letterSpacing={5} textTransform="uppercase">
              TOP 10
            </Text>
            <Text fontWeight={600} fontSize={"2xl"} textTransform="capitalize">
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
