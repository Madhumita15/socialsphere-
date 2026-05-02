import * as yup from "yup";

export const registerSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(6, "Password should be at least 6"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required")
});

export const loginSchema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});


export const profileDialogSchema = yup.object({
  fullname: yup.string().required("Fullname is Required"),
  username: yup.string().required("Username is Required"),
  bio: yup.string().required("Bio is Reuired"),
  phone: yup.string().required("Phone is Required"),
});
