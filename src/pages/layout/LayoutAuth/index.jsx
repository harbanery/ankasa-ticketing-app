import { Box, Container, Flex, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BackgroundIcon,
  MainIcon,
  SmallIcon,
} from "../../../components/base/Icons";

const LayoutAuth = () => {
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center">
      <LeftPanel />
      <RightPanel />
    </Flex>
  );
};

const RightPanel = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      w={{ base: "100%" }}
      h="100vh"
      maxW={{ base: "100%", md: "60%", lg: "50%", xl: "40%" }}
      bg="white"
      position="relative"
      pt={{ base: 4 }}
    >
      <Container my="5%" maxW="sm">
        <Box display="flex" flexDirection="column" h="100%" gap="4" pb="4rem">
          <Link to={"/"}>
            <Image
              display={{ base: "flex" }}
              src="/src/assets/brandicon.png"
              alt="Logo"
              w="158px"
              h="36px"
              mb="5rem"
            />
          </Link>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

const LeftPanel = () => {
  const MotionBox = motion(Box);
  const MotionStack = motion(Stack);

  const leftPanelBackgroundAnimation = {
    background: [
      "linear-gradient(135deg, #41A4FF, #2395FF)",
      "linear-gradient(135deg, #2395FF, #41A4FF)",
      "linear-gradient(135deg, #41A4FF, #9DD0FF)",
      "linear-gradient(135deg, #9DD0FF, #41A4FF)",
      "linear-gradient(135deg, #41A4FF, #2395FF)",
    ],
  };

  const leftPanelBackgroundTransition = {
    duration: 7,
    repeat: Infinity,
    repeatType: "mirror",
  };

  return (
    <Box
      position={{ base: "relative" }}
      display={{ base: "none", md: "block" }}
      w={{ base: "70%", lg: "100%" }}
    >
      <MotionStack
        w={{ base: "100%" }}
        maxW={{ base: "0%", md: "40%", lg: "50%", xl: "60%" }}
        h="100vh"
        position={{ base: "fixed" }}
        display={{ base: "none", md: "flex" }}
        top={0}
        left={0}
        alignItems="center"
        justifyContent="center"
        initial={{ background: "linear-gradient(90deg, #41A4FF, #2395FF)" }}
        animate={leftPanelBackgroundAnimation}
        transition={leftPanelBackgroundTransition}
      >
        <IconElements MotionBox={MotionBox} />
      </MotionStack>
    </Box>
  );
};

const IconElements = ({ MotionBox }) => {
  return (
    <Box w="50%" aspectRatio={1} position="relative">
      <BackgroundIcon />
      <Box w="full" h="full" position="absolute" flex="1">
        <MotionBox
          w="60%"
          h="auto"
          position="absolute"
          top="33%"
          left="12%"
          animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <MainIcon />
        </MotionBox>

        <MotionBox
          w="9%"
          h="auto"
          position="absolute"
          top="2%"
          right="38%"
          animate={{ x: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <SmallIcon color="#C8E4FF" />
        </MotionBox>

        <MotionBox
          w="19%"
          h="auto"
          position="absolute"
          top="48%"
          right="-3%"
          animate={{ x: [0, 7, -7, 0], y: [0, -7, 7, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <SmallIcon color="#9DD0FF" />
        </MotionBox>

        <MotionBox
          w="19%"
          h="auto"
          position="absolute"
          bottom="-3%"
          left="12%"
          animate={{ x: [0, 6, -6, 0], y: [0, -6, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        >
          <SmallIcon color="#E7F3FF" />
        </MotionBox>
      </Box>
    </Box>
  );
};

export default LayoutAuth;
