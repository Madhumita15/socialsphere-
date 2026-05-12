import React, { useSyncExternalStore } from "react";
import { Card } from "../ui/card";
import { useRecentSignUps } from "@/hooks/useAdminStats";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const RecentSignUp = () => {
  const {
    data: signUp,
    isLoading: signupIsLoading,
    isError: signupIsError,
    error: signupError,
  } = useRecentSignUps();

  function useIsClinet() {
    return useSyncExternalStore(
      () => () => {},
      () => true,
      () => false,
    );
  }
const signUpData = signUp?.filter((data)=> data.role !== "admin")
  const isClient = useIsClinet();
  if (!isClient) return null;
  return (
    <>
      {isClient && signUpData && (
        <Card className="bg-black border border-gray-800 p-6">
          {signupIsError && <p>{signupError?.message}</p>}
          {signupIsLoading ? (
            <Skeleton className="aspect-video w-full bg-gray-950" />
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Recent Signups
              </h3>
              <div className="space-y-3">
                {signUpData &&
                  signUpData?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 cursor-pointer hover:bg-gray-800 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold overflow-hidden relative">
                        {user?.avatar_url ? (
                          <Image
                            src={user.avatar_url}
                            alt={user.fullname || "user"}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>
                            {user?.fullname?.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#D493FF] font-medium">
                          {user.fullname}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default RecentSignUp;
