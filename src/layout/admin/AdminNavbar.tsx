"use client";

import TextType from "@/components/TextType";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

const AdminNavbar = () => {
  const { user } = useAuthStore();
  console.log("user", user);

  return (
    <>
      <div className="relative ">
        <h1 className="pt-5 text-2xl pl-10 font-bold">
          <TextType
          className=" bg-linear-to-r from-[#D493FF]  to-[#bb2b0b] bg-clip-text text-transparent"
            text={[`Welcome ${user?.fullname}`]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
          />
        </h1>

        <div className="absolute top-2.5 right-3 flex flex-row gap-3 items-center">
          <div>
            <h1>{user?.fullname}</h1>
            <p>{user?.email}</p>
          </div>
          <div className="w-9 h-9 object-cover rounded-full">
            {user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt="image"
                width={50}
                height={50}
                className="rounded-full border-2 border-[#FF7354]"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full">No</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
