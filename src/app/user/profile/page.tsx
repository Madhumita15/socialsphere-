"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useProfile } from "@/hooks/useFollow";
import { useAuthStore } from "@/store/useAuthStore";

const Profile = () => {
  const { user } = useAuthStore();
  // console.log(user)
  const {data:profileData} = useProfile(user?.auth_user_id)
  console.log("profiledata", profileData)
  
  

  return (
    <>
      <main className="bg-[#121111] min-h-screen text-white pb-20 md:pb-0">
        <ProfileHeader
          name={user?.fullname || ""}
          bio={user?.bio || ""}
          postsCount={user?.post_count}
          followersCount={profileData?.followers_count}
          followingCount={profileData?.following_count}
          profileImage={user?.avatar_url || ""}
          isOwnProfile={true}
          userId={profileData?.auth_user_id}
          isFollowing={false}
        />
        <ProfileTabs />
      </main>
    </>
  );
};

export default Profile;
