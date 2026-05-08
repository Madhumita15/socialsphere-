import { useSimpleTrending } from "@/hooks/useAdminStats";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Tags } from "@/typescript/type/adminDashboard.type";

const AdminDashboardTrendingContent = () => {
  const {
    data: simpleTrendingData,
    error: simpleTrendingError,
    isError: simpleTrendingIsError,
    isLoading: simpleTrendingIsLoading,
  } = useSimpleTrending();

  return (
    <>
      <Card className="bg-black border border-gray-800 p-6">
        {simpleTrendingIsError && <p className='text-red-500 text-sm'>{simpleTrendingError?.message}</p>}
        {simpleTrendingIsLoading ? (
          <Skeleton className="aspect-video w-full bg-gray-950" />
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Trending Topics
            </h3>
            <div className="space-y-3">
              {simpleTrendingData &&
                simpleTrendingData?.map((tag: Tags) => (
                  <div
                    key={tag.tag_name}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 cursor-pointer hover:bg-gray-800 transition-all"
                  >
                    <div>
                      <p className="font-medium text-[#D493FF]">
                        #{tag.tag_name}
                      </p>
                      <p className="text-sm text-gray-400 ">
                        {tag.occurrence_count} Posts
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                ))}
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default AdminDashboardTrendingContent;
