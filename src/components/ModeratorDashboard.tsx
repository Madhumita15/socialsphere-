import { useGetModeratorFlaggedControl } from "@/hooks/useModeratorFlaggedControl";
import { useGetModeratorReports, useGetReportTrends } from "@/hooks/useModeratorReports";
import ModeratorDashboardStats from "./moderatorDashboard/ModeratorDashboardStats";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

 const ModeratorDashboard=()=> {
  const {data:flaggedData, isLoading:flaggedIsLoading} = useGetModeratorFlaggedControl()
  const {data:reportData, isLoading:reportIsLoading} = useGetModeratorReports()
  const {data:trendData} = useGetReportTrends()
  const filteredFlaggedData = flaggedData?.filter((post) => 
    post.report?.some((r:{status:string}) => r.status === "pending")
  ).length || 0;
  const filteredReportData = reportData?.filter((data)=> data.status === "pending").length || 0

  console.log("trending", trendData)
  
  

  return (
    <div className=" bg-[#151515] min-h-screen p-8 text-white">
      <h2 className="text-3xl font-bold mb-8">System <span className="text-[#D493FF]">Overview</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <ModeratorDashboardStats label="Pending Reports" value={filteredReportData} isLoading={flaggedIsLoading}/>
        <ModeratorDashboardStats label="Pending Flagged Media" value={filteredFlaggedData} isLoading={reportIsLoading}/>

        
      </div>

      <div className="h-100 w-full bg-gray-800/20 p-6 rounded-2xl border border-gray-700">
      <h3 className="text-lg font-bold text-[#D493FF] mb-6">Category Growth per Month</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="month" stroke="#71717A" />
          <YAxis stroke="#71717A" />
          <Tooltip 
            cursor={{fill: '#262626'}}
            contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
          />
          <Legend />
          {/* You can map through your categories here */}
          <Bar dataKey="spam" stackId="a" fill="#D493FF" radius={[0, 0, 0, 0]} />
          <Bar dataKey="harassment" stackId="a" fill="#bb2b0b" radius={[0, 0, 0, 0]} />
          <Bar dataKey="explicit" stackId="a" fill="#4ADE80" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
}

export default ModeratorDashboard
