"use client";
import React from "react";
import { useBudget } from "@/app/context/Context";
import Banner from "@/components/banner/Banner";
import Income from "@/components/income/Income";
import Category from "@/components/category/Category";
import Expense from "@/components/expense/Expense";
import Analysis from "@/components/analysis/Analysis";
import Bonus from "@/components/bonus/Bonus";

const Home = () => {
  const { darkMode } = useBudget();

  return (
    <main
      className={`flex flex-col items-center gap-28 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Banner />
      <Income />
      <Category />
      <Expense />
      <Analysis />
      <Bonus />
    </main>
  );
};

export default Home;
