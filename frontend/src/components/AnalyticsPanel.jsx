import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const AnalyticsPanel = ({ analytics, loading }) => {
  if (loading) {
    return <div className="card">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="card">No analytics available.</div>;
  }

  const statusData = [
    { name: "Todo", value: analytics.statusBreakdown?.Todo || 0 },
    { name: "In Progress", value: analytics.statusBreakdown?.["In Progress"] || 0 },
    { name: "Done", value: analytics.statusBreakdown?.Done || 0 },
  ];

  const colors = ["#6b7280", "#3b82f6", "#10b981"];

  return (
    <section className="card">
      <h3>Analytics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Tasks</span>
          <strong>{analytics.totalTasks}</strong>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <strong>{analytics.completedTasks}</strong>
        </div>
        <div className="stat-card">
          <span>Pending</span>
          <strong>{analytics.pendingTasks}</strong>
        </div>
        <div className="stat-card">
          <span>Completion</span>
          <strong>{analytics.completionPercentage}%</strong>
        </div>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={75} label>
              {statusData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AnalyticsPanel;
