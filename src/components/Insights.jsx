const Insights = ({ transactions }) => {

  const expenseData = transactions.filter(t => t.type === "expense");

  const categoryMap = {};
  expenseData.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const topCategory = Object.keys(categoryMap).length
    ? Object.keys(categoryMap).reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b
      )
    : "N/A";

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-5 rounded-2xl shadow-md">
      
      <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-white">
        💡 Insights
      </h2>

      <div className="space-y-2 text-gray-600 dark:text-gray-300">
        <p>
          🔝 Top Spending Category:{" "}
          <span className="font-semibold text-blue-600">
            {topCategory}
          </span>
        </p>

        <p>
          💸 Total Transactions:{" "}
          <span className="font-semibold text-purple-600">
            {transactions.length}
          </span>
        </p>
      </div>

    </div>
  );
};

export default Insights;