"use client";
import React, { useState } from "react";
import InputSection from "@/components/common/inputSection/InputSection";

const CategoryEditor = ({ onSubmit, darkMode }) => {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");

  const handleSubmit = () => {
    if (!name || !limit) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name,
      limit: parseFloat(limit),
    };

    onSubmit(newCategory);
    setName("");
    setLimit("");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center w-full max-w-[1100px] gap-4 py-4 sm:py-0 px-4 dark:bg-black bg-gray-200">
      <div className="flex gap-4 w-full sm:w-2/3 py-2">
        <InputSection
          inputType="text"
          placeholder="Kategori Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputSection
          inputType="number"
          placeholder="Limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full sm:w-1/3 h-auto bg-[#002AFF] py-3 rounded-md text-white text-[15px] font-semibold leading-snug text-center"
      >
        Kategori Ekle
      </button>
    </div>
  );
};

export default CategoryEditor;
