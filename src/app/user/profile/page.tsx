"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useAuthStore } from "@/store/useAuthStore";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <>
      <main className="bg-[#121111] min-h-screen text-white pb-20 md:pb-0">
        <ProfileHeader
          name={user?.fullname || ""}
          bio={user?.bio || ""}
          postsCount={428}
          followersCount={12400}
          followingCount={842}
          profileImage={user?.avatar_url || ""}
          isOwnProfile={true}
        />
        <ProfileTabs />
      </main>
    </>
  );
};

export default Profile;
