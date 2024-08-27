import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const SearchFlight = () => {
  const [value, setValue] = React.useState("1");
  return (
    <Box p={5} boxShadow={"dark-lg"} rounded={"xl"}>
      <Grid gap={3} mb={5}>
        <Text fontWeight={"600"} align="left">
          Hey,
        </Text>
        <Text fontWeight={"600"} fontSize="2xl" align="left">
          Where you want to go?
        </Text>
        <Stack
          display={"flex"}
          justifyContent={"space-between"}
          direction="row"
          color="blue.500"
          alignItems={"center"}
        >
          <Text>Recently Searched</Text>
          <Text>{<IoIosArrowForward />}</Text>
        </Stack>
      </Grid>
      <Grid
        boxShadow="lg"
        rounded={"lg"}
        p={3}
        width="319px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        alignItems={"center"}
        mb={5}
      >
        <GridItem>from</GridItem>
        <GridItem />
        <GridItem>to</GridItem>
        <GridItem fontSize="2xl">Medan</GridItem>
        <GridItem mx={"auto"} color={"blue.500"}>
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
          colorScheme="blue"
          variant="solid"
        >
          One Way
        </Button>
        <Button
          leftIcon={<FaArrowRotateRight />}
          colorScheme="gray"
          variant="outline"
          border="1px"
          borderColor="gray"
        >
          Round Trip
        </Button>
      </Stack>
      <Box mb={5}>
        <Text color={"gray"} align={"left"}>
          Departure
        </Text>
        <Button mt={2} bg={"white"} variant={"outline"} width="full">
          <Flex w={"full"} justifyContent={"space-between"}>
            <Text>Monday, 31 Juli 2025</Text>
            <Text>{<IoIosArrowForward color="blue" />}</Text>
          </Flex>
        </Button>
      </Box>
      <Box mb={5}>
        <Text color={"gray"} align="left">
          How Many Person?
        </Text>
        <Flex columnGap={2} justify={"space-between"} mt={2}>
          <Button w={"full"} bg={"white"} mt={2} variant="outline">
            <Flex w={"full"} justifyContent={"space-between"}>
              <Text>Child</Text>{" "}
              <Text>{<IoIosArrowForward color="blue" />}</Text>
            </Flex>
          </Button>
          <Button w={"full"} bg={"white"} mt={2} variant="outline">
            <Flex w={"full"} justifyContent={"space-between"}>
              <Text>Adult</Text>{" "}
              <Text>{<IoIosArrowForward color="blue" />}</Text>
            </Flex>
          </Button>
        </Flex>
      </Box>
      <Box mb={5}>
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
        colorScheme="blue"
        variant="solid"
      >
        Search Flight
      </Button>
    </Box>
  );
};

export default SearchFlight;
