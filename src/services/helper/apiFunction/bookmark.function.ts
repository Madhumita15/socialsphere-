import { supabase } from "@/lib/supabaseClient";
import { ProfileType } from "@/typescript/type/auth.type";

export const getBookMarkPost = async (user_id: string | undefined) => {
  try {
    const { data: getSaveData, error: getSaveError } = await supabase
      .from("bookmark")
      .select(`*, posts(media_type, media_url, id, caption)`)
      .eq("user_id", user_id)
      .order("created_at", { ascending: true });
    if (getSaveError) throw getSaveError;
    console.log("getSavedData", getSaveData);
    return getSaveData.map((item) => ({
      ...item.posts,      // Spread post data to the top level
      bookmarkId: item.id // Keep bookmark ID if needed, but 'id' is now Post ID
    }));
  } catch {
    return []
  }
};

export const createAndDeleteBookmark = async ({
  user,
  post_id,
}: {
  user: ProfileType;
  post_id: string;
}) => {
  try {
    const { data: existingData, error: existingError } = await supabase
      .from("bookmark")
      .select("*")
      .match({
        post_id: post_id,
        user_id: user.auth_user_id,
      })
      .maybeSingle();

    if (existingError) throw existingError;
    console.log("existingData", existingData);

    if (existingData) {
      const { error: deleteError } = await supabase
        .from("bookmark")
        .delete()
        .eq("post_id", post_id)
        .eq("user_id", user.auth_user_id);
      console.log("deleteError", deleteError);
      return {isSaved: false}
    } else {
      const { data: insertData, error: insertError } = await supabase
        .from("bookmark")
        .insert({
          post_id: post_id,
          user_id: user.auth_user_id,
        })
        .select("*");
      if (insertError) throw insertError;
      console.log("insertData", insertData);
      return {isSaved: true}
    }
  } catch {
    return {
      success: false,
      message: "Failed to save post",
    };
  }
};
