import { Box, Container, Flex, Icon, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet, redirect } from "react-router-dom";
import { getTokenfromLocalStorage } from "../../../utils/localStorage";
import { motion } from "framer-motion";

const LayoutAuth = () => {
  const MotionBox = motion(Box);
  const MotionStack = motion(Stack);
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //     navigate(-1);
  //   }
  // }, []);

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center">
      <Box
        position={{ base: "relative" }}
        display={{ base: "none", md: "block" }}
        w={{ base: "70%", lg: "100%" }}
      >
        <MotionStack
          w={{ base: "100%" }}
          maxW={{ base: "0%", md: "40%", lg: "50%", xl: "60%" }}
          h="100vh"
          // bgGradient="linear(to-bl, #41A4FF, #2395FF)"
          position={{ base: "fixed" }}
          display={{ base: "none", md: "flex" }}
          top={0}
          left={0}
          alignItems="center"
          justifyContent="center"
          initial={{ background: "linear-gradient(90deg, #41A4FF, #2395FF)" }}
          animate={{
            background: [
              "linear-gradient(135deg, #41A4FF, #2395FF)",
              "linear-gradient(135deg, #2395FF, #41A4FF)",
              "linear-gradient(135deg, #41A4FF, #9DD0FF)",
              "linear-gradient(135deg, #9DD0FF, #41A4FF)",
              "linear-gradient(135deg, #41A4FF, #2395FF)",
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Box w="50%" aspectRatio={1} position="relative">
            <Stack w="full" h="full" position="absolute">
              <Icon w="full" h="auto" viewBox="0 0 384 408">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M125.906 3.54591C216.659 -18.1687 265.246 72.7661 312.194 140.026C356.831 203.973 416.584 277.887 362.441 342.415C302.841 413.445 189.591 421.423 102.072 390.447C25.3405 363.289 -3.62464 289.463 0.993983 214.487C6.24862 129.186 31.1652 26.2146 125.906 3.54591Z"
                  fill="white"
                  fill-opacity="0.25"
                />
              </Icon>
            </Stack>
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
                <Icon w="full" h="full" viewBox="0 0 224 153">
                  <path
                    d="M28.9985 147.269C31.1843 150.514 34.254 152.355 37.4664 152.35L82.9 152.265C86.4856 152.258 90.0196 151.101 93.2161 148.887L194.483 78.8344C203.79 72.3961 212.132 63.206 217.809 51.1693C224.181 37.657 224.874 27.8786 222.358 20.9706C219.848 14.0579 213.747 8.98127 202.084 7.94697C191.695 7.02654 181.362 10.7557 172.055 17.1892L137.769 40.9069L61.652 1.97365C60.7368 1.1332 59.6735 0.641254 58.5721 0.548667C57.4707 0.45608 56.3712 0.766218 55.3872 1.44702L32.5033 17.2794C28.7897 19.8461 27.8918 26.6023 30.704 30.8154L85.0753 77.3588L49.1537 102.21L23.9728 84.9073C23.1052 84.3111 22.147 84.0013 21.1754 84.0029C20.2039 84.0046 19.2462 84.3176 18.3797 84.9168L4.41275 94.5813C0.779173 97.0959 -0.177947 103.653 2.47414 107.904L28.9985 147.269Z"
                    fill="white"
                  />
                </Icon>
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
                <Icon w="full" h="full" viewBox="0 0 224 153" color="#C8E4FF">
                  <path
                    d="M28.9985 147.269C31.1843 150.514 34.254 152.355 37.4664 152.35L82.9 152.265C86.4856 152.258 90.0196 151.101 93.2161 148.887L194.483 78.8344C203.79 72.3961 212.132 63.206 217.809 51.1693C224.181 37.657 224.874 27.8786 222.358 20.9706C219.848 14.0579 213.747 8.98127 202.084 7.94697C191.695 7.02654 181.362 10.7557 172.055 17.1892L137.769 40.9069L61.652 1.97365C60.7368 1.1332 59.6735 0.641254 58.5721 0.548667C57.4707 0.45608 56.3712 0.766218 55.3872 1.44702L32.5033 17.2794C28.7897 19.8461 27.8918 26.6023 30.704 30.8154L85.0753 77.3588L49.1537 102.21L23.9728 84.9073C23.1052 84.3111 22.147 84.0013 21.1754 84.0029C20.2039 84.0046 19.2462 84.3176 18.3797 84.9168L4.41275 94.5813C0.779173 97.0959 -0.177947 103.653 2.47414 107.904L28.9985 147.269Z"
                    fill="currentColor"
                  />
                </Icon>
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
                <Icon w="full" h="full" viewBox="0 0 224 153" color="#9DD0FF">
                  <path
                    d="M28.9985 147.269C31.1843 150.514 34.254 152.355 37.4664 152.35L82.9 152.265C86.4856 152.258 90.0196 151.101 93.2161 148.887L194.483 78.8344C203.79 72.3961 212.132 63.206 217.809 51.1693C224.181 37.657 224.874 27.8786 222.358 20.9706C219.848 14.0579 213.747 8.98127 202.084 7.94697C191.695 7.02654 181.362 10.7557 172.055 17.1892L137.769 40.9069L61.652 1.97365C60.7368 1.1332 59.6735 0.641254 58.5721 0.548667C57.4707 0.45608 56.3712 0.766218 55.3872 1.44702L32.5033 17.2794C28.7897 19.8461 27.8918 26.6023 30.704 30.8154L85.0753 77.3588L49.1537 102.21L23.9728 84.9073C23.1052 84.3111 22.147 84.0013 21.1754 84.0029C20.2039 84.0046 19.2462 84.3176 18.3797 84.9168L4.41275 94.5813C0.779173 97.0959 -0.177947 103.653 2.47414 107.904L28.9985 147.269Z"
                    fill="currentColor"
                  />
                </Icon>
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
                <Icon w="full" h="full" viewBox="0 0 224 153" color="#E7F3FF">
                  <path
                    d="M28.9985 147.269C31.1843 150.514 34.254 152.355 37.4664 152.35L82.9 152.265C86.4856 152.258 90.0196 151.101 93.2161 148.887L194.483 78.8344C203.79 72.3961 212.132 63.206 217.809 51.1693C224.181 37.657 224.874 27.8786 222.358 20.9706C219.848 14.0579 213.747 8.98127 202.084 7.94697C191.695 7.02654 181.362 10.7557 172.055 17.1892L137.769 40.9069L61.652 1.97365C60.7368 1.1332 59.6735 0.641254 58.5721 0.548667C57.4707 0.45608 56.3712 0.766218 55.3872 1.44702L32.5033 17.2794C28.7897 19.8461 27.8918 26.6023 30.704 30.8154L85.0753 77.3588L49.1537 102.21L23.9728 84.9073C23.1052 84.3111 22.147 84.0013 21.1754 84.0029C20.2039 84.0046 19.2462 84.3176 18.3797 84.9168L4.41275 94.5813C0.779173 97.0959 -0.177947 103.653 2.47414 107.904L28.9985 147.269Z"
                    fill="currentColor"
                  />
                </Icon>
              </MotionBox>
            </Box>
          </Box>
        </MotionStack>
      </Box>
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
    </Flex>
  );
};

// export const AuthWrapper = ({ children }) => {
//   const loaderData = useLoaderData();

//   if (loaderData && loaderData.redirectTo) {
//     return <Navigate to={loaderData.redirectTo} replace={true} />;
//   }

//   return children;
// };

export default LayoutAuth;
