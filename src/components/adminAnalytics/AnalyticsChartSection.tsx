import { useUserGrowth } from "@/hooks/useAdminStats";
import {
  GrowthChartDataType,
  GrowthPercentageDataType,
} from "@/typescript/type/analystics.type";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

const AnalyticsChartSection = () => {
  const {
    data: growthChartData,
    isError: growthChartisError,
    error: growthChartError,
    isLoading: growthChartIsLoading,
  } = useUserGrowth();
  const growthPercentageData: GrowthPercentageDataType[] | undefined =
    growthChartData?.map(
      (
        current: GrowthChartDataType,
        index: number,
        array: GrowthChartDataType[],
      ): GrowthPercentageDataType => {
        // We can't calculate growth for the very first month (nothing to compare to)
        if (index === 0) {
          return { ...current, userGrowthRate: 0, postGrowthRate: 0 };
        }

        const prev = array[index - 1];

        // Calculate percentage for users
        const userRate =
          prev.users > 0
            ? ((current.users - prev.users) / prev.users) * 100
            : 0;

        // Calculate percentage for posts
        const postRate =
          prev.posts > 0
            ? ((current.posts - prev.posts) / prev.posts) * 100
            : 0;

        return {
          month: current.month,
          userGrowthRate: parseFloat(userRate.toFixed(1)), // e.g., 12.5
          postGrowthRate: parseFloat(postRate.toFixed(1)),
        };
      },
    );
  return (
    <>
      <Card className="bg-black border border-gray-700 p-6">
        {growthChartisError && (
          <p className="text-red-400">{growthChartError?.message}</p>
        )}
        {growthChartIsLoading ? (
          <Skeleton className="aspect-video w-full bg-gray-950" />
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-6 text-white">
              Growth Trends (%)
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthPercentageData}>
                  <XAxis dataKey="month" stroke="#888" />
                  {/* Add a tickFormatter to show % on the side */}
                  <YAxis stroke="#888" tickFormatter={(value) => `${value}%`} />

                  {/* Custom Tooltip to show % */}
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Growth Rate"]}
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "1px solid #374151",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="userGrowthRate"
                    stroke="#a855f7"
                    name="User Growth"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="postGrowthRate"
                    stroke="#f97316"
                    name="Post Growth"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default AnalyticsChartSection;
