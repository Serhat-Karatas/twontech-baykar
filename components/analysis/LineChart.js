"use client";

import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useBudget } from "@/app/context/Context";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Filler
);

const LineChart = () => {
  const { currentUser } = useBudget();

  if (!currentUser) return null;

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const currentYear = new Date().getFullYear();
  const monthlyIncome = Array(12).fill(0);
  const monthlyExpenses = Array(12).fill(0);

  currentUser.income.forEach((income) => {
    const date = new Date(income.date);
    if (date.getFullYear() === currentYear) {
      monthlyIncome[date.getMonth()] += income.amount;
    }
  });

  currentUser.expenses.forEach((expense) => {
    const date = new Date(expense.date);
    if (date.getFullYear() === currentYear) {
      monthlyExpenses[date.getMonth()] += expense.amount;
    }
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Gelir",
        data: monthlyIncome,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Gider",
        data: monthlyExpenses,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar",
        },
      },
      y: {
        title: {
          display: true,
          text: "Tutar",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-[900px]">
      <h2 className="text-3xl font-bold text-center mb-8">
        Aylık Gelir ve Gider Trendleri
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
