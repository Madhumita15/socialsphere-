"use client";

import React, { useState } from "react";
import { 
  Trash2, 
  Eye, 
  RefreshCcw, 
  CheckCircle, 
  ChevronRight,
  Filter
} from "lucide-react";

// Dummy Data
const initialReports = [
  { id: "1", type: "Post", category: "Spam", reporter: "user_12", target_id: "post_88", description: "Selling fake followers", date: "5m ago", severity: "Low" },
  { id: "2", type: "User", category: "Abuse", reporter: "king_j", target_id: "user_unknown", description: "Hate speech in comments", date: "12m ago", severity: "High" },
  { id: "3", type: "Post", category: "Violence", reporter: "emily_z", target_id: "post_44", description: "Graphic content without warning", date: "1h ago", severity: "Critical" },
];

export default function ModeratorReports() {
  const [reports, setReports] = useState(initialReports);
  const [filter, setFilter] = useState("All");

  const handleAction = (id: string, actionName: string) => {
    if (confirm(`Are you sure you want to ${actionName.toLowerCase()} this?`)) {
      setReports(reports.filter((report) => report.id !== id));
    }
  };

  const filteredReports = filter === "All" 
    ? reports 
    : reports.filter(r => r.category === filter);

  return (
    <div className="pl-64 bg-[#0A0A0A] min-h-screen p-8 text-white font-sans selection:bg-purple-500/30">
      
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
          {/* Enhanced Filter Dropdown */}
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D493FF] transition-colors" size={16} />
            <select 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#1A1A1A] border border-gray-800 text-gray-300 text-sm rounded-xl pl-10 pr-4 py-3 focus:border-[#D493FF] focus:ring-1 focus:ring-[#D493FF] outline-none transition-all appearance-none cursor-pointer hover:bg-[#252525]"
            >
              <option value="All">All Categories</option>
              <option value="Spam">Spam</option>
              <option value="Abuse">Abuse</option>
              <option value="Violence">Violence</option>
            </select>
          </div>

          <button 
            onClick={() => setReports(initialReports)}
            className="flex items-center gap-2 bg-[#D493FF] hover:bg-[#c37ef0] text-black font-bold px-10 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <RefreshCcw size={18} /> Refresh Queue
          </button>
        </div>
      </div>

      {/* Reports Table Wrapper */}
      <div className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#1A1A1A]/50">
              <th className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest">Report Info</th>
              <th className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest">Category</th>
              <th className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest">Reporter</th>
              <th className="p-5 text-xs uppercase text-gray-500 font-black tracking-widest text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-white/2 transition-all group">
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="text-white font-bold flex items-center gap-2">
                      {report.type} <ChevronRight size={14} className="text-gray-600" /> 
                      <span className="text-gray-400 font-mono text-xs">{report.target_id}</span>
                    </span>
                    <span className="text-gray-500 text-xs mt-1 italic leading-relaxed">{report.description}</span>
                  </div>
                </td>
                <td className="p-5">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                    report.severity === 'Critical' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-purple-500/10 border-purple-500/50 text-[#D493FF]'
                  }`}>
                    {report.category}
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-linear-to-tr from-gray-800 to-gray-700 border border-gray-700 flex items-center justify-center text-[10px] font-bold">
                      {report.reporter[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-200">@{report.reporter}</span>
                      <span className="text-[10px] text-gray-600 uppercase font-bold">{report.date}</span>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    
                    {/* View Detail Action */}
                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold border border-gray-700 transition-all hover:border-gray-500">
                      <Eye size={14} /> Review
                    </button>

                    {/* Resolve/Approve Action */}
                    <button onClick={() => handleAction(report.id, "Resolve")} className="flex items-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-lg text-xs font-bold border border-green-500/30 transition-all">
                      <CheckCircle size={14} /> Resolve
                    </button>

                    {/* Remove Action */}
                    <button onClick={() => handleAction(report.id, "Remove")} className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-700 text-red-500 hover:text-white rounded-lg text-xs font-bold border border-red-500/30 transition-all shadow-lg hover:shadow-red-500/20">
                      <Trash2 size={14} /> Remove
                    </button>

                    {/* Ban User Action */}
                    {/* <button onClick={() => handleAction(report.id, "Ban User")} className="flex items-center gap-2 px-3 py-2 bg-black hover:bg-white hover:text-black rounded-lg text-xs font-bold border border-gray-700 transition-all">
                      <UserX size={14} /> Ban User
                    </button> */}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReports.length === 0 && (
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