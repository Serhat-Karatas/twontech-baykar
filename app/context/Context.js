"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import data from "@/data.json";

const BudgetContext = createContext();

const BudgetProvider = ({ children, userCookie }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(currentUser?.darkMode || false);

  useEffect(() => {
    if (userCookie) {
      const { id } = JSON.parse(userCookie);

      const userData = data.users.find((user) => user.id === id);
      if (userData) {
        setCurrentUser(userData);
      }
    }
  }, []);

  const addIncome = (income) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      income: [...currentUser.income, { ...income, id: Date.now() }],
    };
    setCurrentUser(updatedUser);
  };

  const editIncome = (incomeId, updatedIncome) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      income: currentUser.income.map((income) =>
        income.id === incomeId ? { ...income, ...updatedIncome } : income
      ),
    };
    setCurrentUser(updatedUser);
  };

  const deleteIncome = (incomeId) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      income: currentUser.income.filter((i) => i.id !== incomeId),
    };
    setCurrentUser(updatedUser);
  };

  const addExpense = (expense) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      expenses: [...currentUser.expenses, { ...expense, id: Date.now() }],
    };
    setCurrentUser(updatedUser);
  };

  const deleteExpense = (expenseId) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      expenses: currentUser.expenses.filter((e) => e.id !== expenseId),
    };
    setCurrentUser(updatedUser);
  };
  const editExpense = (expenseId, updatedExpense) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      expenses: currentUser.expenses.map((expense) =>
        expense.id === expenseId ? { ...expense, ...updatedExpense } : expense
      ),
    };
    setCurrentUser(updatedUser);
  };

  const addCategory = (category) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      categories: [
        ...currentUser.categories,
        { id: Date.now(), name: category.name, limit: category.limit || 0 },
      ],
    };
    setCurrentUser(updatedUser);
  };

  const editCategory = (categoryName, updatedCategory) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      categories: currentUser.categories.map((category) =>
        category.name === categoryName
          ? { ...category, ...updatedCategory }
          : category
      ),
    };
    setCurrentUser(updatedUser);
  };

  const deleteCategory = (categoryName) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      categories: currentUser.categories.filter(
        (category) => category.name !== categoryName
      ),
    };
    setCurrentUser(updatedUser);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    setCurrentUser({ ...currentUser, darkMode: !darkMode });
  };

  return (
    <BudgetContext.Provider
      value={{
        currentUser,
        addIncome,
        addExpense,
        deleteIncome,
        deleteExpense,
        editExpense,
        editIncome,
        addCategory,
        editCategory,
        deleteCategory,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};

export { BudgetProvider, useBudget };
