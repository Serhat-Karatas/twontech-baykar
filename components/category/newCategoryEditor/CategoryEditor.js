"use client";
import React, { useState } from "react";
import BlueBtn from "@/components/common/blueBtn/BlueBtn";
import InputSection from "@/components/common/inputSection/InputSection";

const CategoryEditor = ({ onSubmit }) => {
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
    <div className="flex items-center w-full max-w-[1100px] gap-4 px-4 bg-gray-200">
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
      <BlueBtn onClick={handleSubmit} text="Kategori Ekle" />
    </div>
  );
};

export default CategoryEditor;
