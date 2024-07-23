import React, { useState } from "react";
import { passwordValidation } from "../../../utils/validation";
import { useToast } from "@chakra-ui/react";
import api from "../../../services/api";

const ResetPassword = () => {
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

  return <div>ResetPassword</div>;
};

export default ResetPassword;
