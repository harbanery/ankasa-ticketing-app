import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerValidation } from "../../../utils/validation";
import AlertCustom from "../../../components/base/AlertCustom";
import api from "../../../services/api";
import { optionToast } from "../../../utils/constants";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formAgreed, setFormAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

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
    setLoading(true);
    try {
      await registerValidation.validate(form, { abortEarly: false });

      if (!formAgreed) {
        toast({
          title: "Register Failed",
          description: "You should agree terms & conditions!",
          status: "error",
          ...optionToast,
        });
        setLoading(false);
      } else {
        try {
          const res = await api.post(`register`, {
            username: form.username,
            email: form.email,
            password: form.password,
            role: "customer",
          });

          console.log(res.data.message);
          toast({
            title: "Register Successfully",
            description: "Please check in your email to activate.",
            status: "success",
            ...optionToast,
          });
          setLoading(false);
          navigate("/auth/login");
        } catch (err) {
          console.log(err);
          toast({
            title: "Register Failed",
            ...(err?.response?.data?.message
              ? { description: err?.response?.data?.message }
              : {}),
            status: "error",
            ...optionToast,
          });
          setLoading(false);
        }
      }
    } catch (err) {
      if (err.inner) {
        const formErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        setErrors(formErrors);
      }
      setLoading(false);
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
            mx="auto"
          />
        </Link> */}
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
          <FormControl isInvalid={errors.username ? true : false} isRequired>
            <Input
              type="text"
              name="username"
              value={form.username}
              size="lg"
              onChange={handleChange}
              variant="flushed"
              placeholder="Full Name"
              borderBottom="2px"
              borderBottomColor="#D2C2FFAD"
              autoComplete="off"
              _focus={{
                borderBottomColor: "#2395FF",
              }}
            />
            <Collapse in={errors.username ? true : false} animateOpacity>
              <Text fontSize="14px" mt="8px" textColor="crimson">
                {errors.username || "."}
              </Text>
            </Collapse>
          </FormControl>
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
              autoComplete="off"
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
            <InputGroup size="lg">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                variant="flushed"
                placeholder="Password"
                borderBottom="2px"
                borderBottomColor="#D2C2FFAD"
                _focus={{
                  borderBottomColor: "#2395FF",
                }}
              />
              <InputRightElement width="4.5rem" justifyContent="flex-end">
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  cursor="default"
                >
                  {!showPassword ? (
                    <BsEye
                      onClick={handleShowPassword}
                      color="#2395FF"
                      fontSize="24px"
                      cursor="pointer"
                    />
                  ) : (
                    <BsEyeSlash
                      onClick={handleShowPassword}
                      color="#2395FF"
                      fontSize="24px"
                      cursor="pointer"
                    />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Collapse in={errors.password ? true : false} animateOpacity>
              <Text fontSize="14px" mt="8px" textColor="crimson">
                {errors.password || "."}
              </Text>
            </Collapse>
          </FormControl>
        </Flex>
        <Box
          display="flex"
          alignItems="center"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
          <Checkbox
            textColor="#595959"
            border="#2395FF"
            gap={3}
            onChange={handleChangeCheckbox}
          >
            Accept terms and condition
          </Checkbox>
        </Box>
        <Button
          isLoading={loading ? true : false}
          loadingText="Loading"
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
          <Text textColor="#595959">Already have an account?</Text>
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
