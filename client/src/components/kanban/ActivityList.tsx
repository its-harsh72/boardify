import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export default function ActivityList({ taskId }: any) {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await api.get(`/activity/task/${taskId}`);
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, [taskId]);

  return (
    <div className="space-y-4 mt-4">
      {logs.length === 0 && <p className="text-sm text-gray-500">No activity yet</p>}

      {logs.map((log: any) => (
        <div
          key={log._id}
          className="border p-3 rounded-lg bg-gray-50 shadow-sm"
        >
          <p className="text-sm font-medium">{log.action}</p>
          <p className="text-xs text-gray-500">
            {new Date(log.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
