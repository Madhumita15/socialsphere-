import {
  LoginInputFieldsType,
  ProfileDialogInputFields,
  RegisterInputFieldsType,
} from "@/typescript/type/input.type";

export const registerInputFields: RegisterInputFieldsType[] = [
  {
    label: "Fullname",
    type: "text",
    name: "fullname",
    required: true,
    placeholder: "Enter your fullname",
  },
  {
    label: "Username",
    type: "text",
    name: "username",
    required: true,
    placeholder: "Enter username",
  },
  {
    label: "Email",
    type: "text",
    name: "email",
    required: true,
    placeholder: "example@gmail.com",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    required: true,
    placeholder: "dfg#456",
  },
  {
    label: "Phone",
    type: "text",
    name: "phone",
    required: true,
    placeholder: "7123456096",
  },
];

export const loginInputFields: LoginInputFieldsType[] = [
  {
    label: "Email",
    type: "text",
    name: "email",
    required: true,
    placeholder: "example@gmail.com",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    required: true,
    placeholder: "abc@345",
  },
];

export const ProfileInputFields:ProfileDialogInputFields[] = [
  {
    label: "Fullname",
    type: "text",
    name: "fullname",
    required: true,
    placeholder: " ",
  },
  {
    label: "Username",
    type: "text",
    name: "username",
    required: true,
    placeholder: " ",
  },
  {
    label: "Bio",
    type: "textarea",
    name: "bio",
    required: true,
    placeholder: " ",
  },
  {
    label: "Phone",
    type: "text",
    name: "phone",
    required: true,
    placeholder: " ",
  },
];
