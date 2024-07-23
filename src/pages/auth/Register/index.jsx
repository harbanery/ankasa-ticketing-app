import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerValidation } from "../../../utils/validation";
import AlertCustom from "../../../components/base/AlertCustom";
import api from "../../../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formAgreed, setFormAgreed] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleChangeCheckbox = (e) => {
    setFormAgreed(e.target.checked);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerValidation.validate(form, { abortEarly: false });

      if (!formAgreed) {
        setAlert({
          status: "error",
          message: "You should agree terms & conditions!",
        });
        setAlertKey(alertKey + 1);
      } else {
        try {
          const res = await api.post(`register`, {
            username: form.username,
            email: form.email,
            password: form.password,
            role: "customer",
          });

          console.log(res.data.message);
          setAlert({ status: "success" });
          setAlertKey(alertKey + 1);
          navigate("/");
        } catch (err) {
          console.log(err);
          setAlert({ status: "error", message: err?.response?.data?.message });
          setAlertKey(alertKey + 1);
        }
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
          display={{ base: "none", md: "flex" }}
          position={"absolute"}
          top={10}
          src="/src/assets/brandicon.png"
          alt="Logo"
          w="158px"
          h="36px"
        />
      </Link>
      <Box display="flex" flexDirection="column" h="100%" gap="4">
        <Link to={"/"}>
          <Image
            display={{ base: "flex", md: "none" }}
            src="/src/assets/brandicon.png"
            alt="Logo"
            w="158px"
            h="36px"
            mb="3rem"
          />
        </Link>
        <Heading fontFamily="Poppins" fontWeight="600">
          Register
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
              isInvalid={errors.username ? true : false}
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              size="lg"
              variant="flushed"
              placeholder="Full Name"
              borderBottom="2px"
              borderBottomColor="#D2C2FFAD"
              errorBorderColor="crimson"
              _focus={{
                borderBottomColor: "#2395FF",
              }}
            />
            <Alert
              px="2"
              h="6"
              fontSize="14"
              display={errors.username ? "flex" : "none"}
              status="error"
              variant="subtle"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              rounded="10px"
            >
              <AlertIcon w="4" h="4" />
              <AlertTitle>{errors.username}</AlertTitle>
            </Alert>
          </Stack>
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
              h="6"
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
              h="6"
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
          onClick={handleRegister}
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
          Sign Up
        </Button>
        <Box
          display="flex"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
          <Checkbox
            isInvalid={!formAgreed ? true : false}
            border="#2395FF"
            gap={3}
            onChange={handleChangeCheckbox}
          >
            Accept terms and condition
          </Checkbox>
        </Box>
        <Box mt="8" mx="auto" bg="#D8D8D8" w="80%" h="1px" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
          gap="6"
        >
          <Text>Already have an account?</Text>
          <Button
            onClick={() => navigate("/auth/login")}
            bg="white"
            borderRadius="10px"
            color="#2395FF"
            border="1px"
            borderColor="#2395FF"
            fontFamily="Poppins"
            fontWeight="700"
            fontSize="18px"
            size="lg"
            w="100%"
            h="52px"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _active={{
              bg: "#2395FF",
              color: "white",
              boxShadow: "0px 8px 10px 0px #2395FF4D",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
