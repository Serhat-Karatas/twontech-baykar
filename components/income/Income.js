"use client";
import React from "react";
import IncomeItem from "@/components/income/incomeItem/IncomeItem";
import IncomeEditor from "@/components/newIncomeEditor/IncomeEditor";
import { useBudget } from "@/app/context/Context";

const Income = () => {
  const { currentUser, addIncome, deleteIncome, editIncome } = useBudget();

  if (!currentUser)
    return <div>Cookie den ötürü yüklenmedi, lüten refresh atınız.</div>;

  const handleAddIncome = (income) => addIncome(income);
  const handleDeleteIncome = (incomeId) => deleteIncome(incomeId);
  const handleEditIncome = (id, updatedIncome) => editIncome(id, updatedIncome);

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <IncomeEditor onSubmit={handleAddIncome} />
      <div className="flex flex-col items-center w-full">
        {currentUser.income.length > 0 ? (
          currentUser.income.map((income) => (
            <IncomeItem
              key={income.id}
              id={income.id}
              description={income.description}
              amount={income.amount}
              date={income.date}
              onDelete={handleDeleteIncome}
              onEdit={handleEditIncome}
            />
          ))
        ) : (
          <p>Henüz bir gelir eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default Income;
