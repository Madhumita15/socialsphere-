
import { Card } from '../ui/card'

const moderationLogs = [
  {
    id: 1,
    user: "Dylan Hardback",
    action: "Suspended user",
    status: "Critical",
    statusColor: "text-red-400",
  },
  {
    id: 2,
    user: "Moderator Sarah",
    action: "Flagged content",
    status: "Warning",
    statusColor: "text-orange-400",
  },
  {
    id: 3,
    user: "Admin James",
    action: "User restored",
    status: "Success",
    statusColor: "text-green-400",
  },
];


const AdminModerationLog = () => {
  return (
    <>
    <Card className="bg-black border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-6 text-white">Moderation Logs</h3>
            <div className="space-y-3">
              {moderationLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 cursor-pointer hover:bg-gray-800 transition-all"
                >
                  <div>
                    <p className="text-sm font-medium text-[#dba4dc]">{log.user}</p>
                    <p className="text-xs text-gray-400">{log.action}</p>
                  </div>
                  <p className={`text-xs font-semibold ${log.statusColor}`}>
                    {log.status}
                  </p>
                </div>
              ))}
            </div>
          </Card>
    </>
  )
}

export default AdminModerationLog