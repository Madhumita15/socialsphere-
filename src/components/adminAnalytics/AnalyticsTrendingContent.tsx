import { useSimpleTrending } from "@/hooks/useAdminStats";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Tags } from "@/typescript/type/adminDashboard.type";

const AnalyticsTrendingContent = () => {
  const {
    data: simpleTrendingData,
    error: simpleTrendingError,
    isError: simpleTrendingIsError,
    isLoading: simpleTrendingIsLoading,
  } = useSimpleTrending();
  return (
    <>
    
      {simpleTrendingIsLoading ? (
        <Skeleton className="aspect-video w-full bg-[#1c1a06]" />
      ) : (
        <Card className="bg-[#141105] border border-gray-700 p-3">
            {
                simpleTrendingIsError && <p className="text-red-500 ">{simpleTrendingError?.message}</p>
            }
          <h2 className="text-lg font-semibold mb-6 text-white">
            Trending Hashtags (#tag)
          </h2>
          <div className="space-y-4">
            {simpleTrendingData &&
              simpleTrendingData?.map((item: Tags) => (
                <div
                  key={item.tag_name}
                  className="flex items-center justify-between py-1 border-b border-gray-800 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-[#D493FF]">
                      #{item.tag_name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {item.occurrence_count} posts
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default AnalyticsTrendingContent;
