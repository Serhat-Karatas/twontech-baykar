"use client";

import React from "react";
import { useBudget } from "@/app/context/Context";

const SavingsStatus = () => {
  const { currentUser } = useBudget();

  if (!currentUser) return null;

  const totalIncome = currentUser.income.reduce(
    (acc, income) => acc + income.amount,
    0
  );

  const totalExpenses = currentUser.expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const difference = totalIncome - totalExpenses;
  const percentage =
    totalIncome > 0 ? Math.abs((difference / totalIncome) * 100) : 0;

  const isPositive = difference >= 0;
  const statusMessage = isPositive ? "Tebrikler, kardasın!" : "zarardasın!";

  const textColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div className="max-w-[1100px] mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Toplam Gelir ve Gider Durumu
      </h2>
      <div className={`text-center text-2xl font-bold ${textColor}`}>
        <p className="text-5xl sm:text-9xl font-bold">%{percentage.toFixed(2)}</p>
        {statusMessage}
      </div>
      <div className="flex gap-8 justify-center text-center mt-6">
        <p className="text-gray-500">
          Toplam Gelir:{" "}
          <span className="font-semibold">{totalIncome.toLocaleString()}</span>
        </p>
        <p className="text-gray-500">
          Toplam Gider:{" "}
          <span className="font-semibold">
            {totalExpenses.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SavingsStatus;
