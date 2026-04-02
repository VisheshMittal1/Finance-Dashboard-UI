import { useState } from "react";

const AddTransaction = ({ addTransaction, role }) => {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense"
  });

  if (role !== "admin") return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount)
    };

    addTransaction(newTransaction);

    setForm({
      date: "",
      amount: "",
      category: "",
      type: "expense"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-bold mb-2">Add Transaction</h2>

      <div className="grid md:grid-cols-4 gap-2">
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({...form, date: e.target.value})}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({...form, amount: e.target.value})}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}
          className="border p-2 rounded"
          required
        />

        <select
          value={form.type}
          onChange={(e) => setForm({...form, type: e.target.value})}
          className="border p-2 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default AddTransaction;