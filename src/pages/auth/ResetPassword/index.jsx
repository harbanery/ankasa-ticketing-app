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
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import api from "../../../services/api";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { optionToast } from "../../../utils/constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { user_id, user_token } = useLoaderData();
  const toast = useToast();
  const [form, setForm] = useState({
    password: "",
  });
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await passwordValidation.validate(form, { abortEarly: false });

      try {
        await api.put(
          `resetPassword`,
          {
            password: form.password,
          },
          {
            params: {
              id: user_id,
              token: user_token,
            },
          }
        );
        toast({
          title: "Reset password successfully",
          status: "success",
          ...optionToast,
        });
        setLoading(false);
        navigate("/auth/login");
      } catch (err) {
        console.log(err);
        // setAlert({ status: "error", message: err?.response?.data?.message })

        toast({
          title: "Reset password failed",
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
    <>
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
      <Button
        isLoading={loading ? true : false}
        loadingText="Loading"
        onClick={handleResetPassword}
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
        Change Password
      </Button>
    </>
  );
};

export default ResetPassword;
