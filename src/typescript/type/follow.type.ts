import { ProfileType } from "./auth.type";

export type followerslistType = {
  followers_id: string;
  profile: ProfileType;
}[];

export type follownglistType = {
  following_id: string;
  profile: ProfileType;
}[];