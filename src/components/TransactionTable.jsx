import { useState } from "react";

const TransactionTable = ({ transactions, role }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredData = transactions
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filter === "all" ? true : t.type === filter
    );

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md">
      
      <h2 className="text-lg font-bold mb-4 dark:text-white">
        📋 Transactions
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        
        <input
          type="text"
          placeholder="🔍 Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-full dark:bg-gray-800 dark:text-white"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg overflow-hidden">
          
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              {role === "admin" && <th className="p-3">Action</th>}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((t) => (
                <tr
                  key={t.id}
                  className="text-center border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{t.date}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    ₹{t.amount}
                  </td>
                  <td className="p-3 capitalize">{t.type}</td>

                  {role === "admin" && (
                    <td className="p-3">
                      <button className="text-blue-500 hover:underline mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  🚫 No transactions found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TransactionTable;