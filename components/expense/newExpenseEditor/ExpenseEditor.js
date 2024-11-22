"use client";
import React, { useState } from "react";
import { useBudget } from "@/app/context/Context";
import BlueBtn from "@/components/common/blueBtn/BlueBtn";
import InputSection from "@/components/common/inputSection/InputSection";

const ExpenseEditor = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const { currentUser } = useBudget();
  const categories = currentUser?.categories || [];

  const handleSubmit = () => {
    if (!description || !amount || !date || !category) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date,
      category,
    };

    onSubmit(newExpense);
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <div className="flex items-center w-full max-w-[1100px] gap-4 px-4 bg-gray-200">
      <InputSection
        inputType="text"
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputSection
        inputType="number"
        placeholder="Tutar"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <InputSection
        inputType="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-2 py-3 border border-gray-300 rounded shadow-sm"
      >
        <option value="">Kategori Seç</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <BlueBtn onClick={handleSubmit} text="Gider Ekle" />
    </div>
  );
};

export default ExpenseEditor;
