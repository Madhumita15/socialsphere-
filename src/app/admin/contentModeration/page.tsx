"use client";
import  { useState } from "react";
import { Input } from "@/components/ui/input";
import {  Search } from "lucide-react";
import {
  useAdminGetALLPostWithoutPagination,
} from "@/hooks/useAdminModeration";
import ContentStats from "@/components/adminContentControl/ContentStats";
import AdminContentControlTable from "@/components/adminContentControl/AdminContentControlTable";
import AdminContentPagination from "@/components/adminContentControl/AdminContentPagination";

const ContentModeration = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
 
  // console.log(posts);
 
  const { data: allPostData, isLoading } = useAdminGetALLPostWithoutPagination();
  const totalActivePost = allPostData?.filter(
    (post) => post.visibility === "public",
  ).length;
  const totalPinnedContent = allPostData?.filter(
    (post) => post.is_pinned === true,
  ).length;
  const removeContent = allPostData?.filter(
    (post) => post.is_deleted === true,
  ).length;

  

  

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Content Control
            </h1>
            <p className="text-gray-400 mt-1">
              Super Admin Overview: Pin, Boost, and Sanitize Global Feed
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                onChange={(e) => {
                  console.log(e.target.value);
                  setSearch(e.target.value);
                }}
                placeholder="Search posts or users..."
                className="bg-black border-gray-800 pl-9 focus-visible:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Stats Overview Quick View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ContentStats total={totalActivePost} placeholder="Total Active Post" isLoading={isLoading}/>
           <ContentStats total={totalPinnedContent} placeholder="Ttoal Pinned Content" isLoading={isLoading} />
            <ContentStats total={removeContent} placeholder="Total Removals (24h)" isLoading={isLoading}/>
        </div>

        {/* Main Table Container */}
        <div className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
          <AdminContentControlTable page={page} limit={limit} search={search} />
          
          <AdminContentPagination page={page} limit={limit} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default ContentModeration;
