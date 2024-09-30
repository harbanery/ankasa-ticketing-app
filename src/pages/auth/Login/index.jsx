import React, { useState } from "react";
import {
  Box,
  Button,
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
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import api from "../../../services/api";
import { loginValidation } from "../../../utils/validation";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../services/firebase";
import { setTokentoLocalStorage } from "../../../utils/localStorage";
import { optionToast } from "../../../utils/constants";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [authState, setAuthState] = useState({
    form: {
      email: "",
      password: "",
    },
    loading: false,
    showPassword: false,
  });
  const [errors, setErrors] = useState({});

  const handleShowPassword = () =>
    setAuthState({
      ...authState,
      showPassword: !authState.showPassword,
    });

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    setAuthState({
      ...authState,
      loading: true,
    });
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
          setAuthState({
            ...authState,
            loading: false,
          });
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
        setAuthState({
          ...authState,
          loading: false,
        });
      }
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
      });
    }
  };

  const handleChange = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setAuthState({
      ...authState,
      form: {
        ...authState.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      await loginValidation.validate(authState.form, { abortEarly: false });

      try {
        const res = await api.post(`login`, {
          email: authState.form.email,
          password: authState.form.password,
          role: "customer",
        });

        toast({
          title: "Login Successfully",
          status: "success",
          ...optionToast,
        });

        setAuthState({
          ...authState,
          loading: false,
        });
        setTokentoLocalStorage(res.data);
        navigate("/");
      } catch (err) {
        toast({
          title: "Login Failed",
          ...(err?.response?.data?.message
            ? err.response.data.message ==
              "User not verify. Please check in your email."
              ? { description: "Check in your email for account verification." }
              : { description: "Email or password incorrectly." }
            : {}),
          status: "error",
          ...optionToast,
        });

        setAuthState({
          ...authState,
          loading: false,
        });
      }
    } catch (err) {
      if (err.inner) {
        const formErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        setErrors(formErrors);
      }
      setAuthState({
        ...authState,
        loading: false,
      });
    }
  };

  return (
    <>
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
            value={authState.form.email}
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
              type={authState.showPassword ? "text" : "password"}
              name="password"
              value={authState.form.password}
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
                {!authState.showPassword ? (
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
      <Button
        isLoading={authState.loading ? true : false}
        loadingText="Loading"
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
        textColor="#595959"
        fontSize="16px"
        fontWeight="400"
      >
        <Text>Did You Forgot Your Password?</Text>
        <Text borderBottom="1px" color="#2395FF">
          <Link to={"/auth/forgot-password"}>Tap here for reset</Link>
        </Text>
      </Box>
      <Box mt="4" mx="auto" bg="#D8D8D8" w="80%" h="1px" />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        fontFamily="Lato"
        fontSize="16px"
        fontWeight="400"
        gap="4"
      >
        <Text textColor="#595959">or sign in with</Text>
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

      <Box mt="4" mx="auto" bg="#D8D8D8" w="80%" h="1px" />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        fontFamily="Lato"
        fontSize="16px"
        fontWeight="400"
        gap="6"
      >
        <Text textColor="#595959">Didn't have an account?</Text>
        <Button
          onClick={() => navigate("/auth/register")}
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
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default Login;
