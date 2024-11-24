"use client";
import React from "react";
import ExpenseItem from "@/components/expense/expenseItem/ExpenseItem";
import ExpenseEditor from "@/components/expense/newExpenseEditor/ExpenseEditor";
import { useBudget } from "@/app/context/Context";

const Expense = () => {
  const { currentUser, addExpense, deleteExpense, editExpense } = useBudget();

  if (!currentUser)
    return (
      <div>Cookie kaynaklı yüklenmeme olabilir, lütfen sayfayı yenileyiniz</div>
    );

  const handleAddExpense = (expense) => addExpense(expense);
  const handleDeleteExpense = (expenseId) => deleteExpense(expenseId);
  const handleEditExpense = (id, updatedExpense) =>
    editExpense(id, updatedExpense);

  return (
    <div className="flex flex-col items-center w-full max-w-[1100px] gap-8">
      <h2 className="text-3xl font-bold text-center">Gider Ekle</h2>
      <p className="text-slate-500 px-3 text-center -mt-3">
        Eğer liste yüksekliği 300 px den fazla ise KAYDIRILABİLİR(scrollable)
        bir yapıya dönüşüyor
      </p>
      <ExpenseEditor onSubmit={handleAddExpense} />
      <div className="flex flex-col items-center w-full max-h-[300px] overflow-y-auto">
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
