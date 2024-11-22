"use client";
import React from "react";
import ExpenseItem from "@/components/expense/expenseItem/ExpenseItem";
import ExpenseEditor from "@/components/expense/newExpenseEditor/ExpenseEditor";
import { useBudget } from "@/app/context/Context";

const Expense = () => {
  const { currentUser, addExpense, deleteExpense, editExpense } = useBudget();

  if (!currentUser)
    return <div>Cookie den ötürü yüklenmedi, lüten refresh atınız.</div>;

  const handleAddExpense = (expense) => addExpense(expense);
  const handleDeleteExpense = (expenseId) => deleteExpense(expenseId);
  const handleEditExpense = (id, updatedExpense) =>
    editExpense(id, updatedExpense);

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <ExpenseEditor onSubmit={handleAddExpense} />
      <div className="flex flex-col items-center w-full">
        {currentUser?.expenses.length > 0 ? (
          currentUser?.expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              id={expense.id}
              description={expense.description}
              amount={expense.amount}
              date={expense.date}
              category={expense.category}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
          ))
        ) : (
          <p>Henüz bir gelir eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default Expense;
