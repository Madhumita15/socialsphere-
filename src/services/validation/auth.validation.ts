import * as yup from "yup";

export const registerSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required")
});

export const loginSchema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

