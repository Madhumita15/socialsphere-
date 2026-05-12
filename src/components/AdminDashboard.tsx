"use client";
import { BookHeart, Shrub, SignpostBig, Users } from "lucide-react";
import {
  useEngagementState,
  usePostUsersStats,
  useUserGrowth,
  useUserGrowthRate,
} from "@/hooks/useAdminStats";
import StatsCard from "./adminDashboard/StatsCard";
import RecentSignUp from "./adminDashboard/RecentSignUp";
import AdminDashboardTrendingContent from "./adminDashboard/AdminDashboardTrendingContent";
import AdminUserGrowthChart from "./adminDashboard/AdminUserGrowthChart";


const AdminDasboard = () => {
  const { data: usersPostStats, isLoading: userPostIsLoading } =
    usePostUsersStats();
  const { data: engagementStats, isLoading: engagementIsLoading } =
    useEngagementState();
  const { data: growthData } = useUserGrowthRate();
  const { isLoading: growthChartIsLoading } = useUserGrowth();

  console.log("growthData", growthData)

  return (
    <>
      <div className=" p-8 min-h-screen bg-[#0A0A0A]">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Platform Health</h2>
          <p className="text-gray-400">
            Real-time platform statistics and overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* total users */}
          <StatsCard
            label="Users"
            icon={Users}
            totalStats={usersPostStats?.totalUsers}
            loading={userPostIsLoading}
          />
          <StatsCard
            label="Posts"
            icon={SignpostBig}
            totalStats={usersPostStats?.totalPosts}
            loading={userPostIsLoading}
          />
          <StatsCard
            label="Engagement"
            icon={BookHeart}
            totalStats={engagementStats?.totalEngagement}
            loading={engagementIsLoading}
          />
          <StatsCard
            label="Growth Rate"
            icon={Shrub}
            totalStats={growthData}
            loading={growthChartIsLoading}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <AdminUserGrowthChart />

          {/* Trending Topics */}
          <AdminDashboardTrendingContent />
        </div>

        {/* Bottom Section */}
        <div className="">
          {/* Recent Signups */}
          <RecentSignUp />
        </div>
      </div>
    </>
  );
};

export default AdminDasboard;
