import * as yup from 'yup'
export const postSchema = yup.object({
  location: yup.string().required("Location is required"),
  caption: yup.string().required("Caption is required"),
  
});
