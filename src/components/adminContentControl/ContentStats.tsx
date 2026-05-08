import React from "react";
import { Skeleton } from "../ui/skeleton";

const ContentStats = ({
  total,
  placeholder,
  isLoading
}: {
  total: number | undefined;
  placeholder: string;
  isLoading: boolean
}) => {
  return (
    <>
    {
        isLoading ?  (
            <Skeleton className="w-full aspect-video bg-gray-800" />

        ) : (
            <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
        <p className="text-gray-500 text-sm">{placeholder}</p>
        <h3
          className={`text-2xl font-bold ${placeholder === "Total Removals (24h)" ? "text-red-500" : "text-white"}`}
        >
          {total}
        </h3>
      </div>
        )
    }
      
    </>
  );
};
export default ContentStats;
