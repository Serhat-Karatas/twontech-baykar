"use client";
import React, { useState } from "react";
import BlueBtn from "@/components/common/blueBtn/BlueBtn";
import InputSection from "@/components/common/inputSection/InputSection";

const IncomeEditor = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!description || !amount || !date) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const newIncome = {
      id: Date.now(), 
      description,
      amount: parseFloat(amount),
      date,
    };

    onSubmit(newIncome); 
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center w-full max-w-[1100px] sm:gap-4 py-4 sm:py-0 px-4 bg-gray-200">
      <div className="flex gap-4 w-full py-2">
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
      <div className="flex gap-4 w-full py-2">
        <InputSection
          inputType="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <BlueBtn onClick={handleSubmit} text="Gelir Ekle" />
      </div>
    </div>
  );
};

export default IncomeEditor;
