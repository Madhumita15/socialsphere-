
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { StatsCardInterface } from "@/typescript/interface/admin.interface";



const StatsCard: React.FC<StatsCardInterface> = ({
  label,
  icon: Icon,
  totalStats,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <Skeleton className="aspect-video w-full bg-gray-800" />
      ) : (
        <>
          <Card
            className={`bg-[#0c0114] border border-gray-800 p-6 cursor-pointer transition-all `}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">Total {label}</p>

              <div className={`w-2 h-2 rounded-full bg-green-500 `}></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold mb-3 text-white">{totalStats}</p>
              <div className="bg-gray-700 p-2 rounded-md hover:scale-105 ">
                {
                  <Icon className="hover:text-[#D493FF] text-[#FF7354] size-6" />
                }
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default StatsCard;
