"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookHeart, Shrub, SignpostBig, Users } from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const userGrowthData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 800 },
  { month: "Mar", users: 1200 },
  { month: "Apr", users: 1800 },
  { month: "May", users: 2400 },
  { month: "Jun", users: 3200 },
];

const statsCards = [
  {
    id: 1,
    label: "Total Users",
    value: "125.8K",
    growth: "+12.5%",
    isPositive: true,
    icon: Users,
  },
  {
    id: 2,
    label: "Total Posts",
    value: "89.2K",
    growth: "-2.3%",
    isPositive: false,
    icon: SignpostBig,
  },
  {
    id: 3,
    label: "Total Engagement",
    value: "342.5K",
    growth: "+18.2%",
    isPositive: true,
    icon: BookHeart,
  },
  {
    id: 4,
    label: "Growth Rate",
    value: "23.8%",
    growth: "+5.1%",
    isPositive: true,
    icon: Shrub,
  },
];

const trendingHashtags = [
  { id: 1, name: "#WebDesign", posts: "12.5K" },
  { id: 2, name: "#ProductStudio", posts: "9.8K" },
  { id: 3, name: "#SocialMedia", posts: "8.2K" },
  { id: 4, name: "#HashTag", posts: "6.5K" },
];

const recentSignups = [
  { id: 1, name: "Liam Smith", email: "liam@example.com", initials: "LS" },
  { id: 2, name: "Mason Chen", email: "mason@example.com", initials: "MC" },
  { id: 3, name: "Jordan Brown", email: "jordan@example.com", initials: "JB" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", initials: "SW" },
  { id: 5, name: "Max Simpson", email: "max@example.com", initials: "MS" },
];

const moderationLogs = [
  {
    id: 1,
    user: "Dylan Hardback",
    action: "Suspended user",
    status: "Critical",
    statusColor: "text-red-400",
  },
  {
    id: 2,
    user: "Moderator Sarah",
    action: "Flagged content",
    status: "Warning",
    statusColor: "text-orange-400",
  },
  {
    id: 3,
    user: "Admin James",
    action: "User restored",
    status: "Success",
    statusColor: "text-green-400",
  },
];

const AdminDasboard = () => {
  const [selectedStat, setSelectedStat] = useState<number | null>(null);

  return (
    <>
      <div className=" p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Platform Health</h2>
          <p className="text-gray-400">
            Real-time platform statistics and overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => (
            <Card
              key={stat.id}
              onClick={() => setSelectedStat(stat.id)}
              className={`bg-[#0c0114] border border-gray-800 p-6 cursor-pointer transition-all ${
                selectedStat === stat.id
                  ? "border-purple-500"
                  : "hover:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-400 text-sm">{stat.label}</p>

                <div
                  className={`w-2 h-2 rounded-full ${stat.isPositive ? "bg-green-500" : "bg-red-500"}`}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold mb-3 text-white">
                  {stat.value}
                </p>
                <div className="bg-gray-700 p-2 rounded-md hover:scale-105 ">
                  {
                    <stat.icon className="hover:text-[#D493FF] text-[#FF7354] size-6" />
                  }
                </div>
              </div>
              <p
                className={
                  stat.isPositive
                    ? "text-green-400 text-sm"
                    : "text-red-400 text-sm"
                }
              >
                {stat.growth}
              </p>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <Card className="bg-black border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">User Growth Over Time</h3>
              <Button variant="outline" size="sm" className="text-xs">
                Last 12 Months
              </Button>
            </div>
        
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient
                        id="colorUsers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#D493FF"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#D493FF"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <XAxis dataKey="month" stroke="#888" />
                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#D493FF"
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          
          </Card>

          {/* Trending Topics */}
          <Card className="bg-black border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-6 text-white">Trending Topics</h3>
            <div className="space-y-3">
              {trendingHashtags.map((tag) => (
                <div
                  key={tag.id}
                  onClick={() => setSelectedStat(tag.id + 100)}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 cursor-pointer hover:bg-gray-800 transition-all"
                >
                  <div>
                    <p className="font-medium text-[#D493FF]">{tag.name}</p>
                    <p className="text-sm text-gray-400 ">{tag.posts}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Signups */}
          <Card className="bg-black border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-6 text-white">Recent Signups</h3>
            <div className="space-y-3">
              {recentSignups.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 cursor-pointer hover:bg-gray-800 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                    {user.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#D493FF] font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Moderation Logs */}
          <Card className="bg-black border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-6 text-white">Moderation Logs</h3>
            <div className="space-y-3">
              {moderationLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 cursor-pointer hover:bg-gray-800 transition-all"
                >
                  <div>
                    <p className="text-sm font-medium text-[#dba4dc]">{log.user}</p>
                    <p className="text-xs text-gray-400">{log.action}</p>
                  </div>
                  <p className={`text-xs font-semibold ${log.statusColor}`}>
                    {log.status}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDasboard;