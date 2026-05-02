import { Dispatch, SetStateAction } from "react"

export interface PostItem {
  id: string
  caption: string,
  updated_at: string
  created_at: string
  hashtages: string[]
  media_url: string
  media_type: string
  user_id: string
  visibility: string
  location: string

}

export interface PostsGridProps {
  items: PostItem[];
  isReels?: boolean;
}

export interface PostDialogProps {
  mode: "post" | "reel";
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action: "edit" | "create";
  initialdata: PostItem | null;
}