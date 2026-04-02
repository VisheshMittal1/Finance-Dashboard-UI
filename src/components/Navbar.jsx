import { useEffect, useState } from "react";

const Navbar = ({ role, setRole }) => {
  const [dark, setDark] = useState(false);

  // 🌙 Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // 🌙 Toggle Theme
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-700 transition">
      
      {/* Logo / Title */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          💰 FinTrack
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Finance Dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* Role Switch */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-1 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDark}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:scale-105 transition"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

      </div>
    </div>
  );
};

export default Navbar;