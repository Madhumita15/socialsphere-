export interface ReelUploadSectionProps {
  onUpload: (file: File) => void;
}

export interface ReelsVideoProps {
  username: string;
  caption: string;
  likes: number;
  comments: number;
  videoSrc: string;
  authorName: string;
  avatar_url: string;
  userId: string;
  user_has_liked: boolean;
  id: string;
  isSaved: boolean;
}

