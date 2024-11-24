"use client";
import React from "react";
import { useBudget } from "@/app/context/Context";
import BarChart from "@/components/analysis/BarChart";
import PieChart from "@/components/analysis/PieChart";
import LineChart from "@/components/analysis/LineChart";
import SavingsStatus from "@/components/analysis/SavingsStatus";


const getMonthlyData = (data) => {
  const monthlyData = Array(12).fill(0);

  data.forEach((item) => {
    const date = new Date(item.date);
    const month = date.getMonth();
    monthlyData[month] += item.amount;
  });

  return monthlyData;
};

const Analysis = () => {
  const { currentUser } = useBudget();

  if (!currentUser) {
    return <p>Yükleniyor...</p>;
  }

  const monthlyIncome = getMonthlyData(currentUser.income);
  const monthlyExpenses = getMonthlyData(currentUser.expenses);

  const categoryData = currentUser.categories.map((category) => ({
    name: category.name,
    total: currentUser.expenses
      .filter((expense) => expense.category === category.name)
      .reduce((total, expense) => total + expense.amount, 0),
  }));

  return (
    <div className="flex w-full flex-col items-center gap-28">
      <BarChart data={{ income: monthlyIncome, expenses: monthlyExpenses }} />
      <LineChart />
      <PieChart data={{ categories: categoryData }} />
      <SavingsStatus />
    </div>
  );
};

export default Analysis;
