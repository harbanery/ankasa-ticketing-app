import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../../../services/api";
import AlertCustom from "../../../components/base/AlertCustom";
import { loginValidation } from "../../../utils/validation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../services/firebase";
import { setTokentoLocalStorage } from "../../../utils/localStorage";
import { optionToast } from "../../../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
        toast({
          title: "Login Successfully",
          status: "success",
          ...optionToast,
        });
        setTokentoLocalStorage(res.data);
        navigate("/");
      } catch (err) {
        console.log(err);
        toast({
          title: "Login Failed",
          ...(err?.response?.data?.message
            ? { description: "Email or password incorrectly." }
            : {}),
          status: "error",
          ...optionToast,
        });
      }
    } catch (error) {
      // console.log(error.code);
      // console.log(error.message);
    }
  };

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
        toast({
          title: "Login Successfully",
          status: "success",
          ...optionToast,
        });
        setTokentoLocalStorage(res.data);
        navigate("/");
      } catch (err) {
        console.log(err);
        toast({
          title: "Login Failed",
          ...(err?.response?.data?.message
            ? { description: "Email or password incorrectly." }
            : {}),
          status: "error",
          ...optionToast,
        });
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
          <FormControl isInvalid={errors.email ? true : false} isRequired>
            <Input
              type="email"
              name="email"
              value={form.email}
              size="lg"
              onChange={handleChange}
              variant="flushed"
              placeholder="Email"
              borderBottom="2px"
              borderBottomColor="#D2C2FFAD"
              _focus={{
                borderBottomColor: "#2395FF",
              }}
            />
            <Collapse in={errors.email ? true : false} animateOpacity>
              <Text fontSize="14px" mt="8px" textColor="crimson">
                {errors.email || "."}
              </Text>
            </Collapse>
          </FormControl>
          <FormControl isInvalid={errors.password ? true : false} isRequired>
            <Input
              type="password"
              name="password"
              value={form.password}
              size="lg"
              onChange={handleChange}
              variant="flushed"
              placeholder="Password"
              borderBottom="2px"
              borderBottomColor="#D2C2FFAD"
              _focus={{
                borderBottomColor: "#2395FF",
              }}
            />
            <Collapse in={errors.password ? true : false} animateOpacity>
              <Text fontSize="14px" mt="8px" textColor="crimson">
                {errors.password || "."}
              </Text>
            </Collapse>
          </FormControl>
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
