import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { emailValidation } from "../../../utils/validation";
import api from "../../../services/api";
import { optionToast } from "../../../utils/constants";

const ForgotPassword = () => {
  const toast = useToast();
  const [form, setForm] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailValidation.validate(form, { abortEarly: false });

      try {
        await api.post(`requestResetPassword`, {
          email: form.email,
        });

        // console.log(res.data);
        toast({
          title: "Request reset password successfully",
          description: "Please check in your email to reset your password.",
          status: "success",
          ...optionToast,
        });
        setLoading(false);
        setMessageVisible(true);
      } catch (err) {
        console.log(err);
        toast({
          title: "Failed",
          ...(err?.response?.data?.message
            ? { description: "Email incorrectly." }
            : {}),
          status: "error",
          ...optionToast,
        });
        setLoading(false);
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
        <Heading fontFamily="Poppins" fontWeight="600">
          Forgot Password
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
        </Flex>
        <Button
          isLoading={loading ? true : false}
          loadingText="Loading"
          onClick={handleForgotPassword}
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
          Send
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
          <Text
            opacity={messageVisible ? "100%" : "0%"}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          >
            You&apos;ll get message soon on your email
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
