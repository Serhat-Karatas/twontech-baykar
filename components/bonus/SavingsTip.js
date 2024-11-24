"use client";

import React, { useState } from "react";
import { useBudget } from "@/app/context/Context";

const SavingsTips = () => {
  const { currentUser } = useBudget();
  const [isDialogOpen, setDialogOpen] = useState(false);

  if (!currentUser) return <p>Veriler yükleniyor...</p>;

  const { expenses, categories } = currentUser;

  if (!expenses || expenses.length === 0) {
    return <p>Henüz bir harcama yapılmamış.</p>;
  }

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const categoryAnalysis = categories.map((category) => {
    const totalInCategory = expenses
      .filter((expense) => expense.category === category.name)
      .reduce((acc, expense) => acc + expense.amount, 0);

    const monthsSpent = Math.max(
      1,
      expenses
        .filter((expense) => expense.category === category.name)
        .reduce((uniqueMonths, expense) => {
          const monthKey = new Date(expense.date).getMonth();
          return uniqueMonths.includes(monthKey)
            ? uniqueMonths
            : [...uniqueMonths, monthKey];
        }, []).length
    );

    const adjustedLimit = (category.limit || 0) * monthsSpent;

    return {
      name: category.name,
      totalSpent: totalInCategory,
      adjustedLimit,
      percentage: ((totalInCategory / totalExpenses) * 100).toFixed(2),
    };
  });

  const savingsSuggestions = categoryAnalysis.map((cat) => {
    if (cat.totalSpent > cat.adjustedLimit) {
      return `Kategori "${
        cat.name
      }" için harcamalarınızı gözden geçirin. Harcadığınız: ${cat.totalSpent.toLocaleString(
        "tr-TR"
      )} TL, Ayarlanmış Limit: ${cat.adjustedLimit.toLocaleString(
        "tr-TR"
      )} TL.`;
    }
    if (cat.percentage > 20) {
      return `Kategori "${cat.name}" için harcamalarınız toplam harcamaların %${cat.percentage} kadarını oluşturuyor. Daha az harcamayı değerlendirin.`;
    }
    return `Kategori "${cat.name}" için harcamalarınız kontrol altında görünüyor.`;
  });

  return (
    <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setDialogOpen(true)}
      >
        Tasarruf Önerisi Al
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="max-h-[300px] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Tasarruf Önerileri</h2>
              {savingsSuggestions.length > 0 ? (
                <ul className="list-disc pl-5">
                  {savingsSuggestions.map((suggestion, index) => (
                    <li key={index} className="mb-2">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Tebrikler! Harcamalarınız kontrol altında görünüyor.</p>
              )}
            </div>

            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setDialogOpen(false)}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsTips;
