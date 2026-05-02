
import { LoginFormType, ProfileFormType, RegisterFormType } from "./auth.type"
import { PostFormType } from "./post.type"

export type RegisterInputFieldsType = {
  label: string
  type: string
  name: keyof RegisterFormType
  required: boolean
  placeholder: string
}

export type LoginInputFieldsType = {
  label: string
  type: string
  name: keyof LoginFormType
  required: boolean
  placeholder: string
}



export type PostInputFields = {
  label: string
  type: string
  name: keyof PostFormType
  required: boolean
  placeholder: string
}

export type ProfileDialogInputFields = {
  label: string
  type: string
  name: keyof ProfileFormType
  required: boolean
  placeholder: string
  
}