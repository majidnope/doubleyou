import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { Button, Input } from "@mantine/core";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Auth = () => {

  const nav = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "muhammed@gmail.com",
      password: "1234",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/auth?option=login", values, {
          withCredentials: true,
        });
        if (res.status == 204) {
          alert("no user");

          alert("wrong password");
        } else {
          alert("successfully logged ");
          nav.push("/admin");
        }
      } catch ({ response }) {
  
        if (response.status == 401) alert(response.data.message);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Auth;
