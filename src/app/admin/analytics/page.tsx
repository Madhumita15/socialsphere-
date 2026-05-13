"use client";

import AnalyticsChartSection from "@/components/adminAnalytics/AnalyticsChartSection";
import AnalyticsTrendingContent from "@/components/adminAnalytics/AnalyticsTrendingContent";
import StatsCard from "@/components/adminDashboard/StatsCard";
import {
  useEngagementState,
  usePostUsersStats,
  useUserGrowth,
  useUserGrowthRate,
} from "@/hooks/useAdminStats";
import { BookHeart, Shrub, SignpostBig, Users } from "lucide-react";

const Analytics = () => {
  const { data: usersPostStats, isLoading: userPostIsLoading } =
    usePostUsersStats();
  const { data: engagementStats, isLoading: engagementIsLoading } =
    useEngagementState();
  const { data: growthData } = useUserGrowthRate();
  const { isLoading: growthChartIsLoading } = useUserGrowth();
  

  return (
    <>
      <div className="min-h-screen bg-[#0E0E0E] p-8 text-white">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Platform Analytics</h1>
          <p className="text-gray-400">SocialSphere+ Admin Dashboard</p>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {}
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
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* Line Chart */}
          <AnalyticsChartSection />

          {/* Trending Content Section */}
          <AnalyticsTrendingContent />
        </div>
      </div>
    </>
  );
};

export default Analytics;
