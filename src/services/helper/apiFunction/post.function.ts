import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { ProfileType } from "@/typescript/type/auth.type";
import { PostFormType } from "@/typescript/type/post.type";

export const getAllPost = async (currentUserId?: string) => {
  try {
    const { data: getPostData, error: getPostError } = await supabase
      .from("posts")
      .select(
        `*,author:profile(
        fullname,
        username,
        avatar_url
      ), user_has_liked:likes!left(id)`,
      )
      .eq("likes.user_id", currentUserId);
    if (getPostError) throw getPostError;
    console.log("getPostData", getPostData);
    const postsWithLikeStatus = getPostData.map((post) => ({
      ...post,
      user_has_liked: post.user_has_liked?.length > 0,
    }));
    console.log("postwithlikestatus", postsWithLikeStatus);
    return {
      success: true,
      postsWithLikeStatus,
    };
  } catch {
    return {
      success: false,
      message: "Failed to get Post",
    };
  }
};

export const infinityPost = async ({
  pageParam,
  signal,
  media_type,
  userId,
}: {
  pageParam: number;
  signal: AbortSignal;
  media_type?: "video" | "image";
  userId: string | undefined;
}) => {
  try {
    const pageSize = 8;
    const from = (pageParam - 1) * pageSize;
    const to = pageParam * pageSize - 1;

    let query = supabase
      .from("posts")
      .select(
        `*, author:profile(
        fullname,
        username,
        avatar_url
      ), user_has_liked:likes!left(id)`,
      )
      .eq("likes.user_id", userId);

    if (media_type) {
      query = query.eq("media_type", media_type);
    }

    const { data: getScrollData, error: getScrollError } = await query
      .order("created_at", { ascending: false })
      .range(from, to)
      .abortSignal(signal);
    if (getScrollError) throw getScrollError;
    const formattedData = getScrollData?.map((post) => ({
      ...post,
      user_has_liked: post.user_has_liked && post.user_has_liked.length > 0,
    }));

    return {
      success: true,
      formattedData,
    };
  } catch {
    return {
      success: false,
      message: "Failed to infinite scroll",
    };
  }
};






export const getPostById = async ({
  id,
  userId,
}: {
  id: string;
  userId: string | undefined;
}) => {
  try {
    const { data: getPostData, error: getPostError } = await supabase
      .from("posts")
      .select(
        `*, author:profile(
        fullname,
        username,
        avatar_url
      ),user_has_liked:likes!left(id)`,
      )
      .eq("likes.user_id", userId)
      .eq("id", id)
      // .single();
    if (getPostError) throw getPostError;
    console.log("getPostData", getPostData);
    const formattedData = getPostData?.map((post) => ({
      ...post,
      user_has_liked: post.user_has_liked && post.user_has_liked.length > 0,
    }));
    return {
      success: true,
      formattedData,
    };
  } catch {
    return {
      success: false,
      message: "Failed to get Post",
    };
  }
};

export const createPost = async ({
  data,
  mode,
  user,
}: {
  data: PostFormType;
  mode: "post" | "reel" | "edit";
  user: ProfileType;
}) => {
  try {
    let imageurl = null;
    if (data.mediaurl) {
      const filename = `${crypto.randomUUID()}.${data.mediaurl.name}`;
      const { data: mediaUploadData, error: mediaUploadError } =
        await supabase.storage
          .from("post_image")
          .upload(filename, data.mediaurl);
      if (mediaUploadError) throw mediaUploadError;
      console.log("mediauploadData", mediaUploadData);
      const { data: mediaViewData } = supabase.storage
        .from("post_image")
        .getPublicUrl(filename);
      console.log("mediaViewData", mediaViewData);
      imageurl = mediaViewData.publicUrl;
    }
    console.log("imageUrl", imageurl);
    const hashtags =
      data.caption.match(/#\w+/g)?.map((tag: string) => tag.slice(1)) || [];
    const media_type = mode === "post" ? "image" : "video";
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert({
        caption: data.caption,
        user_id: user?.auth_user_id,
        location: data.location,
        media_url: imageurl,
        media_type: media_type,
        hashtags: hashtags,
        visibility: "public",
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();
    if (postError) throw postError;

    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .update({
        post_count: (user.post_count || 0) + 1,
      })
      .eq("auth_user_id", user.auth_user_id);
    if (profileError) throw profileError;
    console.log("profileData", profileData);
    console.log("postData", postData);
    useAuthStore.getState().refreshUser();
    return {
      success: true,
      message: "Post Created Successfully!",
    };
  } catch {
    return {
      success: false,
      message: "Failed to create Post",
    };
  }
};

export const updatePost = async ({
  data,
  id,
}: {
  data: PostFormType;
  id: string;
}) => {
  try {
    // console.log("type os", typeof id)
    const hashtags =
      data.caption?.match(/#\w+/g)?.map((tag: string) => tag.slice(1)) || [];
    const { data: updatedData, error: updatedError } = await supabase
      .from("posts")
      .update({
        caption: data.caption,
        location: data.location,
        hashtags: hashtags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (updatedError) throw updatedError;

    console.log("updatedData", updatedData);
    return {
      success: true,
      message: "Post updated Successfully!",
    };
  } catch {
    return {
      success: false,
      message: "Failed to update Post",
    };
  }
};

export const deletePost = async (id: string, user: ProfileType) => {
  try {
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("media_url")
      .eq("id", id)
      .single();
    if (postError) throw postError;
    const imageurl = postData.media_url;
    const oldPath = imageurl.split("/post_image/")[1];
    const { error: deleteimageError } = await supabase.storage
      .from("post_image")
      .remove([oldPath]);
    if (deleteimageError) throw deleteimageError;

    const { error: deletePostError } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);
    if (deletePostError) throw deletePostError;

    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .update({
        post_count: user.post_count - 1,
      })
      .eq("auth_user_id", user.auth_user_id);
    if (profileError) throw profileError;
    console.log("profileData", profileData);
    useAuthStore.getState().refreshUser();
    return {
      success: true,
      message: "Post delete Successfully!",
    };
  } catch {
    return {
      success: false,
      message: "Failed to delete Post",
    };
  }
};
