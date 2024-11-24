"use client";
import React from "react";
import IncomeItem from "@/components/income/incomeItem/IncomeItem";
import IncomeEditor from "@/components/newIncomeEditor/IncomeEditor";
import { useBudget } from "@/app/context/Context";

const Income = () => {
  const { currentUser, addIncome, deleteIncome, editIncome } = useBudget();

  if (!currentUser)
    return (
      <div>Cookie kaynaklı yüklenmeme olabilir, lütfen sayfayı yenileyiniz</div>
    );

  const handleAddIncome = (income) => addIncome(income);
  const handleDeleteIncome = (incomeId) => deleteIncome(incomeId);
  const handleEditIncome = (id, updatedIncome) => editIncome(id, updatedIncome);

  return (
    <div className="flex flex-col items-center w-full max-w-[1100px] gap-8">
      <h2 className="text-3xl font-bold text-center">Gelir Ekle</h2>
      <p className="text-slate-500 px-3 text-center -mt-3">
        Eğer liste yüksekliği 300 px den fazla ise KAYDIRILABİLİR(scrollable)
        bir yapıya dönüşüyor
      </p>
      <IncomeEditor onSubmit={handleAddIncome} />
      <div className="flex flex-col items-center w-full max-h-[300px] overflow-y-auto">
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
