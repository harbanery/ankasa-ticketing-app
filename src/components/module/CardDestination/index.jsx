import React from "react";
import {
  Card,
  Stack,
  CardHeader,
  Box,
  Flex,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const CardComponent = ({ backgroundImage, airlinesCount, city, country }) => {
  return (
    <Card
      backgroundImage={`url(${backgroundImage})`}
      w={{ base: "90%" }}
      h={{ base: "262px" }}
      mx="auto"
      rounded="20px"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      bgPosition="center"
      bgSize="cover"
    >
      <Stack
        h="full"
        bgGradient="linear(to-b, transparent, black)"
        rounded="20px"
        justifyContent="space-between"
      >
        <CardHeader>
          <Box
            px={"20px"}
            py={"10px"}
            w={"fit-content"}
            color={"gray"}
            backdropFilter="auto"
            backdropContrast="60%"
            rounded="full"
          >
            <Flex columnGap={2}>
              <Text color={"white"} fontWeight={600}>
                {airlinesCount}
              </Text>
              <Text color={"white"} fontWeight={300}>
                Airlines
              </Text>
            </Flex>
          </Box>
        </CardHeader>
        <CardFooter>
          <Flex justify={"space-between"} w={"full"} alignItems={"center"}>
            <Box>
              <Text fontSize={"base"} color={"white"}>
                {city},
              </Text>
              <Text fontSize={"2xl"} color={"white"} fontWeight={600}>
                {country}
              </Text>
            </Box>
            <Link to="#">
              <Box
                color={"gray"}
                backdropFilter="auto"
                backdropContrast="40%"
                rounded="full"
                p={1}
                h={"fit-content"}
              >
                <IoIosArrowForward color="white" />
              </Box>
            </Link>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default CardComponent;
