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

    const selectedCategory = categories.find((cat) => cat.name === category);
    if (selectedCategory) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const monthlyExpenses = currentUser.expenses
        .filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expense.category === category &&
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
          );
        })
        .reduce((total, expense) => total + expense.amount, 0);

      const newTotal = monthlyExpenses + parseFloat(amount);

      if (
        selectedCategory.limit > 0 &&
        newTotal > selectedCategory.limit * 0.8
      ) {
        alert(
          `Dikkat! ${category} kategorisi için belirlenen limitin %80'ini geçtiniz.`
        );
      }
    }

    onSubmit(newExpense);
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center w-full max-w-[1100px] gap-4 py-4 sm:py-2 px-4 dark:bg-black bg-gray-200">
      <div className="flex w-full gap-4">
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
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex w-full gap-4 min-w-0 sm:min-w-[350px]">
          <InputSection
            inputType="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-2 py-3 border border-gray-300 rounded shadow-sm text-black"
          >
            <option value="">Kategori Seç</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <BlueBtn onClick={handleSubmit} text="Gider Ekle" />
      </div>
    </div>
  );
};

export default ExpenseEditor;
