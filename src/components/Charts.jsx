import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ transactions }) => {
  // Line Chart Data (by date)
  const lineData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  // Pie Chart Data (category wise)
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = ["#4F46E5", "#22C55E", "#EF4444", "#F59E0B"];

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md">
      
      <h2 className="text-lg font-bold mb-4 dark:text-white">
        📊 Financial Overview
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2 dark:text-gray-400">
            Balance Trend
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2 dark:text-gray-400">
            Spending Breakdown
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Charts;