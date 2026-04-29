"use client"

import ProfileHeader from '@/components/ProfileHeader'
import ProfileTabs from '@/components/ProfileTabs'
import { useAuthStore } from '@/store/useAuthStore'


const Profile = () => {
  const {user} = useAuthStore()
  console.log("user", user)


  return (
    <>
      <main className="bg-[#121111] min-h-screen text-white pb-20 md:pb-0">

      <ProfileHeader
        name={user?.fullname || ""}
        bio= {user?.bio || ""}
        postsCount={428}
        followersCount={12400}
        followingCount={842}
        profileImage={user?.avatar_url || ""}
        isOwnProfile={true}
      />
      <ProfileTabs isOwnProfile={true} />
    </main>
    </>
  )
}

export default Profile