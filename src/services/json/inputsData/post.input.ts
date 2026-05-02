import { PostInputFields } from "@/typescript/type/input.type";

export const PostInput: PostInputFields[] = [
  { label: "Caption", type: "textarea", name: "caption", required: true, placeholder: "Write a caption... #hashtags @mentions" },
  { label: "Location", type: "text", name: "location", required: true, placeholder: "Add location" },
  
];
