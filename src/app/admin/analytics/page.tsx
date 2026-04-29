"use client";

import { Card } from "@/components/ui/card";
import { BookHeart, Shrub, SignpostBig, Users } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

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

const trendingContent = [
  {
    id: 1,
    title: "Summer Vibes Challenge",
    posts: "15.2K",
    engagement: "98.5K",
  },
  {
    id: 2,
    title: "#NewFeatureRelease",
    posts: "12.8K",
    engagement: "87.3K",
  },
  {
    id: 3,
    title: "Fitness Motivation Week",
    posts: "10.5K",
    engagement: "72.1K",
  },
  {
    id: 4,
    title: "Travel Stories Collection",
    posts: "9.3K",
    engagement: "65.8K",
  },
];

const growthData = [
  { month: "Jan", users: 400, posts: 200 },
  { month: "Feb", users: 600, posts: 300 },
  { month: "Mar", users: 800, posts: 500 },
  { month: "Apr", users: 1200, posts: 700 },
  { month: "May", users: 1500, posts: 900 },
];

const Analytics = () => {
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
          {statsCards.map((stat) => (
            <Card
              key={stat.id}
              className="bg-black border border-gray-700 p-6 hover:scale-105 transition-all ease-in-out"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold mb-3 text-white">
                  {stat.value}
                </p>
                <div className="bg-gray-700 p-2 rounded-md hover:scale-105 ">
                  {
                    <stat.icon className="text-[#D493FF] hover:text-[#FF7354] size-6" />
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
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* Line Chart */}
          <Card className="bg-black border border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-6 text-white">Growth Trends</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#a855f7"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="#f97316"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Bar Chart */}
          <Card className="bg-black border border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-6 text-white">Engagement Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#D493FF" />
                  <Bar dataKey="posts" fill="#FF7354" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Trending Content Section */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-[#141105] border border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-6 text-white">Trending Hashtags</h2>
            <div className="space-y-4">
              {trendingContent.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-[#D493FF]">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.posts} posts</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#FF7354]">{item.engagement}</p>
                    <p className="text-sm text-gray-400">engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Analytics;
