import { LoginFormType, RegisterFormType } from "./auth.type"

export type RegisterInputFieldsType = {
  label: string
  type: string
  name: keyof RegisterFormType
  required: boolean
}

export type LoginInputFieldsType = {
  label: string
  type: string
  name: keyof LoginFormType
  required: boolean
}
