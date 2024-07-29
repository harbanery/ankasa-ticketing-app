import React, { useState } from "react";
import { passwordValidation } from "../../../utils/validation";
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
import api from "../../../services/api";
import { Link, redirect, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  // const [searchParams] = useSearchParams();

  const toast = useToast();
  const [form, setForm] = useState({
    password: "",
  });
  const [errors, setErrors] = useState({});

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
    try {
      await passwordValidation.validate(form, { abortEarly: false });

      try {
        await api.post(`resetPassword`, {
          password: form.password,
        });
      } catch (err) {
        console.log(err);
        // setAlert({ status: "error", message: err?.response?.data?.message })
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
        <Heading fontFamily="Poppins" fontWeight="600">
          Reset Password
        </Heading>
        <Flex
          direction="column"
          my="5"
          gap="7"
          fontFamily="Lato"
          fontSize="16px"
          fontWeight="400"
        >
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
      </Box>
    </Container>
  );
};

export default ResetPassword;
