import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../../../services/api";
import AlertCustom from "../../../components/base/AlertCustom";
import { loginValidation } from "../../../utils/validation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../services/firebase";
import { setTokentoLocalStorage } from "../../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [formGoogle, setFormGoogle] = useState({
    username: "",
    email: "",
    phone_number: "",
    image: "",
    google_uid: "",
    // is_Verify: false,
  });

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(response);
      // const token = credential.accessToken;
      const user = response.user;
      try {
        const res = await api.post(`loginAuthProvider`, {
          username: user.displayName,
          email: user.email,
          phone_number: user.phoneNumber,
          image: user.photoURL,
          role: "customer",
          google_uid: user.uid,
        });

        // console.log(res.data.message);
        setAlert({ status: "success" });
        setAlertKey(alertKey + 1);
        setTokentoLocalStorage(res.data);
        navigate("/");
      } catch (err) {
        console.log(err);
        setAlert({ status: "error", message: err?.response?.data?.message });
        setAlertKey(alertKey + 1);
      }
    } catch (error) {
      // console.log(error.code);
      // console.log(error.message);
    }
  };

  // Alert
  const [alert, setAlert] = useState({
    status: "idle",
    message: "",
  });
  const [alertKey, setAlertKey] = useState(0);
  // Alert

  const handleChange = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginValidation.validate(form, { abortEarly: false });

      try {
        const res = await api.post(`login`, {
          email: form.email,
          password: form.password,
          role: "customer",
        });

        // console.log(res.data);
        setAlert({ status: "success" });
        setAlertKey(alertKey + 1);
        setTokentoLocalStorage(res.data);
        navigate("/");
      } catch (err) {
        console.log(err);
        setAlert({ status: "error", message: err?.response?.data?.message });
        setAlertKey(alertKey + 1);
      }
    } catch (err) {
      if (err.inner) {
        const formErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        setErrors(formErrors);
      }
    }
  };

  return (
    <Container my="5%" maxW="sm">
      <AlertCustom alertState={alert} count={alertKey} />
      <Link to={"/"}>
        <Image
          // display={{ base: "none", md: "flex" }}
          position={"absolute"}
          top={10}
          src="/src/assets/brandicon.png"
          alt="Logo"
          w="158px"
          h="36px"
        />
      </Link>
      <Box display="flex" flexDirection="column" h="100%" gap="4">
        {/* <Link to={"/"}>
          <Image
            display={{ base: "flex", md: "none" }}
            src="/src/assets/brandicon.png"
            alt="Logo"
            w="158px"
            h="36px"
            mb="3rem"
          />
        </Link> */}
        <Heading fontFamily="Poppins" fontWeight="600">
          Login
        </Heading>
        <Flex
          direction="column"
          my="5"
          gap="7"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
          <Stack spacing={1}>
            <Input
              isInvalid={errors.email ? true : false}
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              size="lg"
              variant="flushed"
              placeholder="Email"
              borderBottom="2px"
              borderBottomColor="#D2C2FFAD"
              errorBorderColor="crimson"
              _focus={{
                borderBottomColor: "#2395FF",
              }}
            />
            <Alert
              px="2"
              py="1"
              h="auto"
              fontSize="14"
              display={errors.email ? "flex" : "none"}
              status="error"
              variant="subtle"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              rounded="10px"
            >
              <AlertIcon w="4" h="4" />
              <AlertTitle>{errors.email}</AlertTitle>
            </Alert>
          </Stack>
          <Stack spacing={1}>
            <Input
              isInvalid={errors.password ? true : false}
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              size="lg"
              variant="flushed"
              placeholder="Password"
              borderBottom="2px"
              borderBottomColor="#D2C2FFAD"
              errorBorderColor="crimson"
              _focus={{
                borderBottomColor: "#2395FF",
              }}
            />
            <Alert
              px="2"
              py="1"
              h="auto"
              fontSize="14"
              display={errors.password ? "flex" : "none"}
              status="error"
              variant="subtle"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              rounded="10px"
            >
              <AlertIcon w="4" h="4" />
              <AlertTitle>{errors.password}</AlertTitle>
            </Alert>
          </Stack>
        </Flex>
        <Button
          onClick={handleLogin}
          bg="#2395FF"
          borderRadius="10px"
          color="white"
          size="lg"
          w="100%"
          h="57px"
          fontFamily="Poppins"
          fontSize="18px"
          fontWeight="700"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          boxShadow="0px 8px 10px 0px #2395FF4D"
          _hover={{ bg: "#1971c2" }}
          _active={{
            bg: "#dddfe2",
            boxShadow: "0px 8px 10px 0px #dddfe24D",
          }}
        >
          Sign In
        </Button>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
          <Text>Did You Forgot Your Password?</Text>
          <Text borderBottom="1px" color="#2395FF">
            <Link to={"/auth/forgot-password"}>Tap here for reset</Link>
          </Text>
        </Box>
        <Box mt="8" mx="auto" bg="#D8D8D8" w="80%" h="1px" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
          gap="4"
        >
          <Text>or sign in with</Text>
          <Flex gap="4">
            <Button
              onClick={handleLoginGoogle}
              bg="white"
              borderRadius="10px"
              color="white"
              border="1px"
              borderColor="#2395FF"
              size="lg"
              w="100%"
              h="52px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _active={{
                bg: "#2395FF",
                boxShadow: "0px 8px 10px 0px #2395FF4D",
              }}
            >
              <FcGoogle fontSize="24px" />
            </Button>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
