
import { ProfileInterfaceType } from "../interface/auth.interface";

export type RegisterFormType = {
  fullname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
};

export type LoginFormType = {
  password: string;
  email: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
};



export type ProfileType = {
  auth_user_id: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  email: string;
  fullname: string;
  id: string;
  phone: string;
  role: string;
  username: string;
};

export type LoginResponse =
  | {
      success: true;
      message: string;
      redirect: string;
      user?: ProfileType ;
    }
  | {
      success: false;
      error: string;
    };

export type ProfileResponse = {
  success: boolean;
  message: string;
};

export type GoogleResponse = {
  success: boolean,
  message: string
}

export type AuthType = {
  role: string,
  token: string,
  user: ProfileType
}


export type ProfileFormType = {
  fullname: string;
  username: string;
  bio: string;
  phone: string;
  avatar_url?: File | null
};

export type AuthStore = {
  loading: boolean;
  error: string | null;
  token: string | null;
  role: string | null;
  user: ProfileType | null;
  registerUser: (data: RegisterFormType) => Promise<RegisterResponse>;
  loginUser: (data: LoginFormType) => Promise<LoginResponse>;
  userProfile: ({
    bio,
    image,
  }: ProfileInterfaceType) => Promise<ProfileResponse>;
  googleLogin: ()=> Promise<GoogleResponse>;
  setAuth: (data: AuthType)=> void 
  logoutUser: () => void;
  editUserProfile: (data: ProfileFormType)=> Promise<ProfileResponse>

};

export type ProfileDialogPropsType = {
  open: boolean
  isEdit: boolean
  setOpen: (open: boolean)=> void
  setIsEdit: (isEdit: boolean)=> void
}
