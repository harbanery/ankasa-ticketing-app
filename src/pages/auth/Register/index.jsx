import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerValidation } from "../../../utils/validation";
import api from "../../../services/api";
import { optionToast } from "../../../utils/constants";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { setTokentoLocalStorage } from "../../../utils/storage";
import { auth, provider } from "../../../services/firebase";

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
          await api.post(`register`, {
            username: form.username,
            email: form.email,
            password: form.password,
            role: "customer",
          });

          toast({
            title: "Register Successfully",
            description: "Please check in your email to activate.",
            status: "success",
            ...optionToast,
          });
          setLoading(false);
          navigate("/auth/login");
        } catch (err) {
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

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
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

        if (res.data) {
          toast({
            title: "Login Successfully",
            status: "success",
            ...optionToast,
          });
          setLoading(false);
          setTokentoLocalStorage(res.data);
          navigate("/");
        } else {
          throw "Token doesn't created.";
        }
      } catch (err) {
        toast({
          title: "Login Failed",
          ...(err?.response?.data?.message
            ? { description: "Email or password incorrectly." }
            : {}),
          status: "error",
          ...optionToast,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
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
        gap="4"
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
        <Text textColor="#595959">or</Text>
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
          <Tooltip
            hasArrow
            placement="top"
            label="Facebook not available at the moment..."
            bg="red.500"
            borderRadius="4px"
            fontFamily="Poppins"
          >
            <Button
              bg="white"
              borderRadius="10px"
              color="#4175DF"
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
              isDisabled
            >
              <FaFacebook fontSize="24px" />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
    </>
  );
};

export default Register;
