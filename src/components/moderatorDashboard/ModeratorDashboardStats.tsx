import { Skeleton } from "../ui/skeleton";

const ModeratorDashboardStats = ({
  label,
  value,
  isLoading,
}: {
  label: string;
  value: number;
  isLoading: boolean;
}) => {
  return (
    <>
      <div
        key={label}
        className="bg-gray-800/40 border border-gray-700 p-6 rounded-2xl"
      >
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        {isLoading && <Skeleton className="w-full aspect-video bg-gray-800" />}
        <div className="flex items-end gap-3 mt-2">
          <h3 className="text-4xl font-bold text-white">{value}</h3>
        </div>
      </div>
    </>
  );
};

export default ModeratorDashboardStats;
