import { useState } from "react";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
import TransactionTable from "../components/TransactionTable";
import AddTransaction from "../components/AddTransaction";
import Insights from "../components/Insights";
import { transactions as data } from "../data/mockData";

const Dashboard = () => {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState(data);

  // ➕ Add Transaction Function
  const addTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
  };

  // Calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition duration-300">
      
      {/* Navbar */}
      <Navbar role={role} setRole={setRole} />

      <div className="p-6 grid gap-6">
        
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-gray-500 dark:text-gray-400">💰 Total Balance</h2>
            <p className="text-2xl font-bold text-blue-600">₹{balance}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-gray-500 dark:text-gray-400">📈 Income</h2>
            <p className="text-2xl font-bold text-green-600">₹{income}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-gray-500 dark:text-gray-400">📉 Expense</h2>
            <p className="text-2xl font-bold text-red-600">₹{expense}</p>
          </div>

        </div>

        {/* Charts Section (Wrapped in Card) */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md">
          <Charts transactions={transactions} />
        </div>

        {/* ➕ Add Transaction (Admin Only) */}
        <AddTransaction 
          addTransaction={addTransaction} 
          role={role} 
        />

        {/* 💡 Insights (Highlighted) */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-5 rounded-2xl shadow">
          <Insights transactions={transactions} />
        </div>

        {/* 📋 Transactions Table (Wrapped) */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md">
          <TransactionTable 
            transactions={transactions} 
            role={role} 
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;