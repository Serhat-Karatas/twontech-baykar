"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.categories.map((cat) => cat.name),
    datasets: [
      {
        label: "Kategoriye Göre Giderler",
        data: data.categories.map((cat) => cat.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(99, 255, 132, 0.6)",
          "rgba(132, 99, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[900px]">
      <h2 className="text-3xl font-bold mb-8 text-center">Kategorilere Göre Gider Dağılımı</h2>
      <div className="w-full max-w-[400px]">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default PieChart;
