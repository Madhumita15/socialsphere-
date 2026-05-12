import { useUserGrowth } from "@/hooks/useAdminStats";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const AdminUserGrowthChart = () => {
  const {
    data: growthChartData,
    isError: growthChartisError,
    error: growthChartError,
    isLoading: growthChartIsLoading,
  } = useUserGrowth();
  console.log("growthChartData", growthChartData);
  return (
    <>
      <Card className="bg-black border border-gray-800 p-6">
        {growthChartisError && (
          <p className="text-red-500 text-sm">{growthChartError?.message}</p>
        )}
        {growthChartIsLoading ? (
          <Skeleton className="aspect-video w-full bg-gray-950" />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                User Growth Over Time
              </h3>
              <Button variant="outline" size="sm" className="text-xs">
                Last 6 Months
              </Button>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthChartData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D493FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#D493FF" stopOpacity={0} />
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
                    connectNulls={true}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4, fill: "#D493FF" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default AdminUserGrowthChart;
