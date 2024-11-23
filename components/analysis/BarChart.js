"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Gelir",
        data: data.income,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Gider",
        data: data.expenses,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="w-full max-w-[900px]">
      <h2 className="text-3xl font-bold text-center mb-8">
        Aylık Gelir ve Giderler
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
