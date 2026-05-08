"use client";
import { Users, Ban } from "lucide-react";
import { useGetAllUser } from "@/hooks/useAdminUserMnagement";
import { useState } from "react";
import UserTable from "@/components/adminUserManagement/UserTable";
import UserTablePagination from "@/components/adminUserManagement/UserTablePagination";

const UserManagement = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(5);
  const { data: getAllUsers } = useGetAllUser({ page, limit });

  const getAllUser = getAllUsers?.allUserData?.filter(
    (user) => user.role !== "admin",
  );
  const countAllActiveUser: number | undefined = getAllUser?.filter(
    (user) => user.status === "active",
  ).length;

  const countBlockedUser = getAllUser?.filter(
    (user) => user.status === "blocked",
  ).length;

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              User Management
            </h1>
            <p className="text-slate-400 text-lg">
              Oversee, moderate, and manage your global community of{" "}
              <span className="text-[#D493FF] font-semibold">
                {getAllUsers?.allUserData?.length}
              </span>
              .
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#D493FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#D493FF]/10">
              <p className="text-[#999999] text-sm font-medium mb-2">
                Active Users
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white">
                    {countAllActiveUser}
                  </p>
                  <p className="text-[#D493FF] text-sm font-semibold mt-1">
                    {getAllUser && countAllActiveUser
                      ? (
                          (countAllActiveUser / getAllUser?.length) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </p>
                </div>
                <Users className="w-10 h-10 text-[#D493FF]/40" />
              </div>
            </div>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#FF7354] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7354]/10">
              <p className="text-[#999999] text-sm font-medium mb-2">
                Blocked Users
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white">
                    {countBlockedUser}
                  </p>
                  <p className="text-[#FF7354] text-sm font-semibold mt-1">
                    {getAllUser && countBlockedUser
                      ? ((countBlockedUser / getAllUser?.length) * 100).toFixed(
                          2,
                        )
                      : 0}
                    %
                  </p>
                </div>
                <Ban className="w-10 h-10 text-[#FF7354]/40" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-black border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl p-7">
            <UserTable page={page} limit={limit} />

            <UserTablePagination page={page} limit={limit} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
