"use client";

import React, { useState } from "react";
import { 
  Trash2, 
  Eye, 
  CheckCircle, 
  ChevronRight,
  Filter
} from "lucide-react";
import { useGetModeratorReports, useRemoveModeratorReports, useResoveModeratorReports } from "@/hooks/useModeratorReports";
import Image from "next/image";

// Shadcn Table Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReviewPostDialog } from "@/components/moderatorReport/ReviewPostDialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function ModeratorReports() {
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null)
  const { data, isLoading, isError, error } = useGetModeratorReports();
  const {mutate:resolveMutate, isPending:resolvePending, variables:resolveVariables} = useResoveModeratorReports()
  const {mutate:removeMutate, isPending:removePending, variables:removeVariables} = useRemoveModeratorReports()
  // console.log("data", data)
  
  

  const filteredData = data?.filter((item)=> item.status === "pending" )
  console.log("filteredData", filteredData)

  const filteredReports = filter === "All" 
    ? filteredData
    : filteredData?.filter((r) => r.category === filter);
    console.log("filteredReports", filteredData)
    console.log(selectedReport)

  return (
    <div className=" bg-[#0A0A0A] min-h-screen p-8 text-white font-sans selection:bg-purple-500/30">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#D493FF] text-sm font-bold tracking-widest uppercase">
            <div className="w-2 h-2 rounded-full bg-[#D493FF] animate-pulse" />
            Live Moderation Queue
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Security <span className="text-gray-500">&</span> Reports</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D493FF] transition-colors" size={16} />
            <select 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#1A1A1A] border border-gray-800 text-gray-300 text-sm rounded-xl pl-10 pr-4 py-3 focus:border-[#D493FF] focus:ring-1 focus:ring-[#D493FF] outline-none transition-all appearance-none cursor-pointer hover:bg-[#252525]"
            >
              <option value="All">All Categories</option>
              <option value="spam">Spam</option>
              <option value="harassment">Harassment</option>
              <option value="explicit">Explicit</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-[#1A1A1A]/50 border-b border-gray-800">
            <TableRow className="hover:bg-transparent border-b border-gray-800">
              <TableHead className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest">Report Info</TableHead>
              <TableHead className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest">Category</TableHead>
              <TableHead className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest">Reporter</TableHead>
              <TableHead className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest text-right">Moderation Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports?.map((report) => {
              const date = new Date(report.created_at).toLocaleDateString();
              const isResolveThis = resolvePending && resolveVariables === report.id 
              const isRemoveThis = removePending && removeVariables === report.id
              return (
                <TableRow key={report.id} className="border-b border-gray-800/50 hover:bg-white/2 transition-all group">
                  <TableCell className="p-5">
                    <div className="flex flex-col">
                      <span className="text-white font-bold flex items-center gap-2">
                        {report.target_type} <ChevronRight size={14} className="text-gray-600" /> 
                        <span className="text-gray-400 font-mono text-xs">{report.target_post_id}</span>
                      </span>
                      <span className="text-gray-500 text-xs mt-1 italic leading-relaxed line-clamp-1">
                        {report.description}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="p-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-tight uppercase border border-purple-500/20 bg-purple-500/5 text-[#D493FF]">
                      {report.category}
                    </div>
                  </TableCell>
                  
                  <TableCell className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-700 bg-gray-800">
                        <Image 
                          src={report.reporter.avatar_url || "/default-avatar.png"} 
                          fill
                          alt="reporter avatar" 
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-200">@{report.reporter.username}</span>
                        <span className="text-[10px] text-gray-600 uppercase font-bold">{date}</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* View Detail Action */}
                      <Button onClick={()=> setSelectedReport(report.id)} className="flex cursor-pointer  items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold border border-gray-700 transition-all hover:border-gray-500">
                        <Eye size={14} /> Review
                      </Button>
                      

                      {/* Resolve Action */}
                      <Button 
                      disabled={isResolveThis}
                        onClick={() => resolveMutate({id:report.id, postId:report.target_post.id})} 
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-600 text-green-500 hover:text-white rounded-lg text-xs font-bold border border-green-500/30 transition-all"
                      >
                        <CheckCircle size={14} /> {isResolveThis ? <Spinner width={5} height={5} /> : "Resolved"}
                      </Button>

                      {/* Remove Action */}
                      <Button 
                      disabled={isRemoveThis}
                        onClick={() => removeMutate({report_id:report.id, post_id:report.target_post.id})} 
                        className="flex items-center cursor-pointer gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-700 text-red-500 hover:text-white rounded-lg text-xs font-bold border border-red-500/30 transition-all shadow-lg hover:shadow-red-500/20"
                      >
                        <Trash2 size={14} /> {isRemoveThis ? <Spinner width={5} height={5} /> : "Remove" }
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <ReviewPostDialog  onClose={()=> setSelectedReport(null)}  report_id={selectedReport}/>

        {filteredReports?.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-gray-600 bg-[#0F0F0F]">
            <div className="w-16 h-16 rounded-full bg-gray-800/30 flex items-center justify-center mb-4">
              <CheckCircle className="opacity-20" size={32} />
            </div>
            <p className="font-bold text-lg text-gray-500">Queue is Clear</p>
            <p className="text-sm">No pending reports for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}