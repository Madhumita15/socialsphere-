"use client"

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import {
  useChangeUser,
  useGetAllUser,
  useToggleBlockUnblockUser,
} from "@/hooks/useAdminUserMnagement";
import { Users, Crown, CheckCircle2, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";


const UserTable = ({page, limit}: {page:number, limit:number}) => {
    const { data: getAllUsers } = useGetAllUser({ page, limit });
  const {
    mutate: updateStuatus,
    isPending,
    variables,
  } = useToggleBlockUnblockUser();
  const {
    mutate: changeUserMutate,
    isPending: chnageUserIsPending,
    variables: changeUserVariables,
  } = useChangeUser();
  const handleToggle = (userId: string, status: "blocked" | "active") => {
    console.log("userid", userId);
    const newStatus = status === "active" ? "blocked" : "active";
    updateStuatus({ userId, newStatus });
  };

  const handleToggleChangeUser = (userId: string, change: string) => {
    const newChange = change === "user" ? "user" : "moderator";
    changeUserMutate({ userId, newChange });
  };
  return (
    <>
      <Table>
        <TableHeader className="bg-[#0a0a0a] border-b border-[#2a2a2a]">
          <TableRow className="hover:bg-[#0a0a0a]">
            <TableHead className="text-white font-bold text-start py-3 px-2 text-sm">
              USER
            </TableHead>
            <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
              ROLE
            </TableHead>
            <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
              STATUS
            </TableHead>
            <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
              JOINED DATE
            </TableHead>
            <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { getAllUsers?.allUserData?.map((user) => {
            const date = new Date(user.created_at).toLocaleDateString();
            return (
              <TableRow
                key={user.id}
                className=" border-b border-[#2a2a2a]
    hover:bg-[#0f0f0f]
    focus:bg-[#0f0f0f]
    data-[state=selected]:bg-[#0f0f0f]
    data-[state=open]:bg-[#0f0f0f]
    transition-colors duration-200"
              >
                <TableCell className="font-medium py-3 px-2">
                  <div className="flex flex-row items-center gap-5">
                    <Image
                      src={user.avatar_url}
                      alt={user.username.slice(0, 2)}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-[#D493FF]/40 hover:ring-[#D493FF] transition-all duration-300"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-sm hover:text-[#D493FF] transition-colors">
                        {user.fullname}
                      </h3>
                      <p className="text-[#666666] text-xs">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto transition-all duration-200 ${
                      user.role === "moderator"
                        ? "bg-[#D493FF]/15 text-[#D493FF] border border-[#D493FF]/30"
                        : "bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30"
                    }`}
                  >
                    {user.role === "moderator" ? (
                      <Crown className="w-3 h-3" />
                    ) : (
                      <Users className="w-3 h-3" />
                    )}
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-center py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto transition-all duration-200 ${
                      user.status === "active"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-[#FF7354]/15 text-[#FF7354] border border-[#FF7354]/30"
                    }`}
                  >
                    {user.status === "active" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                    {user.status === "active" ? "Active" : "Blocked"}
                  </span>
                </TableCell>
                <TableCell className="text-center py-3 px-2 text-[#666666] text-sm">
                  {date}
                </TableCell>
                <TableCell className="py-3 px-2">
                  <div className="flex flex-col gap-2">
                    <Button
                      disabled={isPending && variables.userId === user.id}
                      onClick={() => handleToggle(user.id, user.status)}
                      className={`cursor-pointer w-full transition-all duration-200 font-semibold text-xs py-2 h-8 ${
                        user.status === "active"
                          ? "bg-[#D493FF] hover:bg-[#D493FF]/90 text-white border border-[#D493FF]/40 active:bg-[#D493FF]"
                          : "bg-[#FACC15] hover:bg-[#FACC15]/90 text-black border border-[#FACC15]/40 active:bg-[#FACC15]"
                      }`}
                    >
                      {isPending && variables.userId === user.id ? (
                        <Spinner width={5} height={5} />
                      ) : user.status === "active" ? (
                        "Block"
                      ) : (
                        "Unblock"
                      )}
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleToggleChangeUser(user.id, "user")}
                        className={`cursor-pointer flex-1 transition-all duration-200 font-semibold text-xs py-2 h-8 ${
                          user.role === "user"
                            ? "bg-[#FACC15]/30 text-[#FACC15] border border-[#FACC15]/30 cursor-default opacity-50"
                            : "bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30 hover:bg-[#FACC15]/25"
                        }`}
                      >
                        {chnageUserIsPending &&
                        changeUserVariables.userId === user.id &&
                        user.role === "moderator" ? (
                          <Spinner width={5} height={5} />
                        ) : (
                          "User"
                        )}
                      </Button>
                      <Button
                        onClick={() =>
                          handleToggleChangeUser(user.id, "moderator")
                        }
                        className={`cursor-pointer flex-1 transition-all duration-200 font-semibold text-xs py-2 h-8 ${
                          user.role === "moderator"
                            ? "bg-[#D493FF]/30 text-[#D493FF] border border-[#D493FF]/30 cursor-default opacity-50"
                            : "bg-[#D493FF]/15 text-[#D493FF] border border-[#D493FF]/30 hover:bg-[#D493FF]/25"
                        }`}
                      >
                        {chnageUserIsPending &&
                        changeUserVariables.userId === user.id &&
                        user.role === "user" ? (
                          <Spinner width={5} height={5} />
                        ) : (
                          "Moderator"
                        )}
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
