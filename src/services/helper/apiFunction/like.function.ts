import { supabase } from "@/lib/supabaseClient";
import { ProfileType } from "@/typescript/type/auth.type";


export const toggleLike = async ({ user, post_id }: { user: ProfileType, post_id: string }) => {
    const { data, error } = await supabase.rpc("handle_like_toggle", {
        target_post_id: post_id,
        target_user_id: user.auth_user_id
    });

    if (error) throw error;
    return data; // Returns { success: true, is_liked: true/false }
}

