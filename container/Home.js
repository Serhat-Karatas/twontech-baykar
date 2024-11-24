"use client";
import React, { useEffect } from "react";
import Banner from "@/components/banner/Banner";
import Income from "@/components/income/Income";
import Category from "@/components/category/Category";
import Expense from "@/components/expense/Expense";
import Analysis from "@/components/analysis/Analysis";
import Bonus from "@/components/bonus/Bonus";
import { useBudget } from "@/app/context/Context";

const Home = () => {
  const { darkMode } = useBudget();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main
      className="flex flex-col items-center gap-28"
      style={{
        backgroundColor: darkMode ? "rgb(17, 24, 39)" : "rgb(255, 255, 255)",
        color: darkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
      }}
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
