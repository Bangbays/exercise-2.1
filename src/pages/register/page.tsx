"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterPage = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("Password is required"),
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.post("http://localhost:5000/users", values);
      alert("Registration Successful!");
    } catch (error) {
      alert("Registration Failed!");
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2x1 font-bold mb-6">Register</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
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
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
