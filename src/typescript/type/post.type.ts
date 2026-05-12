export type PostFormType = {
  location: string
  caption: string
  mediaurl?: File | null

}

export interface PostCardProps {
  id: string;
  type: "image" | "video";
  src: string;
 
}

export interface PostUploadSectionProps {
  onUpload: (file: File) => void;
}