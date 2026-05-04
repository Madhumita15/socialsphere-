import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { ProfileType } from "@/typescript/type/auth.type";
import {
  followerslistType,
  follownglistType,
} from "@/typescript/type/follow.type";

export const getFollow = async (targetId: string, user: ProfileType) => {
  const { data: followData } = await supabase
    .from("follows")
    .select("*")
    .eq("followers_id", user.auth_user_id)
    .eq("following_id", targetId)
    .maybeSingle();

  return !!followData;
};

// export const createFollow = async ({
//   user,
//   followingId,
// }: {
//   user: ProfileType;
//   followingId: string;
// }) => {
//   try {
//     const { data: existingFollowData } = await supabase
//       .from("follows")
//       .select("*")
//       .eq("following_id", followingId)
//       .eq("followers_id", user.auth_user_id)
//       .maybeSingle();
//     if (existingFollowData) {
//       const { error: deleteFollowError } = await supabase
//         .from("follows")
//         .delete()
//         .eq("id", existingFollowData.id);
//       if (deleteFollowError) throw deleteFollowError;
//       const { data: profileData, error: profileError } = await supabase
//         .from("profile")
//         .update({
//           following_count: Math.max(0, (user.following_count || 0) - 1),
//         })
//         .eq("auth_user_id", user.auth_user_id);
//       if (profileError) throw profileError;
//       await supabase.rpc("decrement_followers_count", {
//         target_id: followingId,
//       });
//       console.log(profileData);
//       useAuthStore.getState().refreshUser();
//       return {
//         success: true,
//         message: "Unfollowed",
//       };
//     } else {
//       const { data: followData, error: followError } = await supabase
//         .from("follows")
//         .insert({
//           followers_id: user.auth_user_id,
//           following_id: followingId,
//         })
//         .select("*")
//         .single();
//       if (followError) throw followError;
//       console.log("followData", followData);
//       const { data: profileData, error: profileError } = await supabase
//         .from("profile")
//         .update({
//           following_count: (user.following_count || 0) + 1,
//         })
//         .eq("auth_user_id", user.auth_user_id);
//       if (profileError) throw profileError;
//       await supabase.rpc("increment_followers_count", {
//         target_id: followingId,
//       });
//       console.log(profileData);
//       useAuthStore.getState().refreshUser();
//       return {
//         success: true,
//         message: "Followed",
//       };
//     }
//   } catch {
//     return {
//       success: false,
//       meessage: "Failed to create follow",
//     };
//   }
// };



export const createFollow = async ({
  user,
  followingId,
}: {
  user: ProfileType;
  followingId: string;
}) => {
  try {
    if (!user.auth_user_id) throw new Error("User ID is missing");

    // 1. Check if follow record exists
    const { data: existingFollowData } = await supabase
      .from("follows")
      .select("id")
      .eq("following_id", followingId)
      .eq("followers_id", user.auth_user_id)
      .maybeSingle();

    if (existingFollowData) {
      // --- UNFOLLOW LOGIC ---
      const { error: deleteFollowError } = await supabase
        .from("follows")
        .delete()
        .eq("id", existingFollowData.id);

      if (deleteFollowError) throw deleteFollowError;

      // Decrement YOUR following_count (in DB)
      await supabase.rpc("decrement_following_count_id", {
        my_id: user.auth_user_id,
      });

      // Decrement THEIR followers_count (in DB)
      await supabase.rpc("decrement_followers_count", {
        target_id: followingId,
      });

      useAuthStore.getState().refreshUser();
      return { success: true, message: "Unfollowed" };

    } else {
      // --- FOLLOW LOGIC ---
      const { error: followError } = await supabase
        .from("follows")
        .insert({
          followers_id: user.auth_user_id,
          following_id: followingId,
        });

      if (followError) throw followError;

      // Increment YOUR following_count (in DB)
      await supabase.rpc("increment_following_count", {
        my_id: user.auth_user_id,
      });

      // Increment THEIR followers_count (in DB)
      await supabase.rpc("increment_followers_count", {
        target_id: followingId,
      });

      useAuthStore.getState().refreshUser();
      return { success: true, message: "Followed" };
    }
  } catch {
    return {
      success: false,
      message:  "Failed to process follow request",
    };
  }
};

export const fetchUserProfile = async (profileId: string | undefined) => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("auth_user_id", profileId)
      .single();
    if (error) throw error;
    return data;
  } catch {
    return {
      success: false,
      message: "Failed to fetch user profile",
    };
  }
};

export const getFollowersList = async (
  target_id: string,
): Promise<ProfileType[]> => {
  try {
    const { data, error } = await supabase
      .from("follows")
      .select(`followers_id, profile:profile!follows_followers_id_fkey (*)`)
      .eq("following_id", target_id);
    if (error) throw error;
    console.log("followingData", data);
    const followersData = data as unknown as followerslistType;
    return followersData?.map((item) => item.profile) || [];
  } catch {
    return [];
  }
};

export const getFollowingList = async (
  target_id: string,
): Promise<ProfileType[]> => {
  try {
    const { data, error } = await supabase
      .from("follows")
      .select(`following_id, profile:profile!follows_following_id_fkey (*)`)
      .eq("followers_id", target_id);
    if (error) throw error;
    console.log("followersData", data);
    const followingData = data as unknown as follownglistType;
    return followingData?.map((item) => item.profile) || [];
  } catch {
    return [];
  }
};





export const removeFollowerApi = async ({
  followerId,
  user,
}: {
  followerId: string;
  user: ProfileType;
}) => {
  try {
    if (!user.auth_user_id) throw new Error("Logged in user ID is missing");

    const { data, error } = await supabase
      .from("follows")
      .delete()
      .eq("followers_id", followerId) // The person following you
      .eq("following_id", user.auth_user_id) // You
      .select();

    if (error) throw error;

    // Safety check: only update counts if a row was actually deleted
    if (!data || data.length === 0) {
      throw new Error("No matching follower relationship found.");
    }

    // 2. Call the ONE RPC to fix both counts in the database
    const { error: rpcError } = await supabase.rpc("handle_follower_removal_counts", {
      my_id: user.auth_user_id,
      follower_to_remove_id: followerId,
    });
    
    if (rpcError) throw rpcError;

    // 3. Sync your local Auth Store
    useAuthStore.getState().refreshUser();
    
    return { message: "Follower removed successfully", data };

  } catch {
    return {
      success: false,
      message: "Failed to remove follower",
    };
  }
};



// export const removeFollowerApi = async ({
//   followerId,
//   user,
// }: {
//   followerId: string;
//   user: ProfileType;
// }) => {
//   try {
//     if (!user.auth_user_id) throw new Error("Logged in user ID is missing");
//     const { data, error } = await supabase
//       .from("follows")
//       .delete()
//       .eq("followers_id", followerId)
//       .eq("following_id", user.auth_user_id)
//       .select();

//     if (error) throw error;
//     if (!data || data.length === 0) {
//       throw new Error("No matching follower relationship found.");
//     }

//     const { error: profileError } = await supabase
//       .from("profile")
//       .update({
//         followers_count: Math.max(0, (user.followers_count || 0) - 1),
//       })
//       .eq("auth_user_id", user.auth_user_id);

//     if (profileError) throw profileError;
//     const { error: rpcError } = await supabase.rpc("decrement_following_count", {
//       target_id: followerId,
//     });
    
//     if (rpcError) throw rpcError;

//     // 4. SYNC FRONTEND
//     useAuthStore.getState().refreshUser();
    
//     return { message: "Follower removed successfully", data };

//   } catch  {
   
//     return {
//       success: false,
//       message:  "Failed to remove follower",
//     };
//   }
// };