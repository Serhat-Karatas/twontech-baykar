import React from "react";
import { useBudget } from "@/app/context/Context";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useBudget();

  return (
    <button
      onClick={toggleDarkMode}
      className={`px-4 py-2 rounded ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default DarkModeToggle;
