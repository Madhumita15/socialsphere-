
 const ModeratorDashboard=()=> {
  const stats = [
    { label: "Pending Reports", value: "142", trend: "+12%" },
    { label: "Active Bans", value: "28", trend: "+2" },
    { label: "Flagged Media", value: "1,054", trend: "-5%" },
    { label: "Mod Response Time", value: "4m 20s", trend: "-30s" },
  ];

  return (
    <div className="pl-64 bg-[#151515] min-h-screen p-8 text-white">
      <h2 className="text-3xl font-bold mb-8">System <span className="text-[#D493FF]">Overview</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800/40 border border-gray-700 p-6 rounded-2xl">
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            <div className="flex items-end gap-3 mt-2">
              <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
              <span className="text-[#D493FF] text-sm mb-1">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/20 border border-gray-700 rounded-2xl h-[300px] flex items-center justify-center text-gray-500 italic">
          Activity Chart Placeholder
        </div>
        <div className="bg-gray-800/20 border border-gray-700 rounded-2xl h-[300px] flex items-center justify-center text-gray-500 italic">
          Regional Reports Map Placeholder
        </div>
      </div>
    </div>
  );
}

export default ModeratorDashboard
