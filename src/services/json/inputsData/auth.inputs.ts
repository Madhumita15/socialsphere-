import { LoginInputFieldsType, RegisterInputFieldsType } from "@/typescript/type/input.type";


export const registerInputFields: RegisterInputFieldsType[] = [
  { label: "Fullname", type: "text", name: "fullname", required: true },
  { label: "Username", type: "text", name: "username", required: true },
  { label: "Email", type: "text", name: "email", required: true },
  { label: "Password", type: "password", name: "password", required: true },
  { label: "Phone", type: "text", name: "phone", required: true },
];

export const loginInputFields: LoginInputFieldsType[] = [
  { label: "Email", type: "text", name: "email", required: true },
  { label: "Password", type: "password", name: "password", required: true },
];
