"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/lib/authSlicets";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.get("http://localhost:5000/users", {
        params: { email: values.email, password: values.password },
      });
      if (response.data.length > 0) {
        dispatch(login(values.email));
        alert("Login Successful!");
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      alert("Login failed!");
    }
  };

  if (!isClient) return null;

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2x1 font-bold mb-6">Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
