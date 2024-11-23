"use client";
import React from "react";
import { useBudget } from "@/app/context/Context";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFDownload = () => {
  const { currentUser } = useBudget();

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${currentUser.name} - Finansal Rapor`, 14, 20);
    doc.setLanguage("tr");

    if (currentUser.income.length > 0) {
      doc.setFontSize(14);
      doc.text("Gelirler", 14, 30);

      const incomeRows = currentUser.income.map((income) => [
        income.description,
        income.amount.toLocaleString("tr-TR"),
        income.date,
      ]);

      doc.autoTable({
        startY: 35,
        head: [["Açıklama", "Tutar", "Tarih"]],
        body: incomeRows,
      });
    }

    if (currentUser.expenses.length > 0) {
      const expenseTableStart = doc.lastAutoTable.finalY + 10 || 40;
      doc.text("Giderler", 14, expenseTableStart);

      const expenseRows = currentUser.expenses.map((expense) => [
        expense.description,
        expense.category,
        expense.amount.toLocaleString("tr-TR"),
        expense.date,
      ]);

      doc.autoTable({
        startY: expenseTableStart + 5,
        head: [["Açıklama", "Kategori", "Tutar", "Tarih"]],
        body: expenseRows,
      });
    }

    const totalIncome = currentUser.income.reduce(
      (acc, inc) => acc + inc.amount,
      0
    );
    const totalExpenses = currentUser.expenses.reduce(
      (acc, exp) => acc + exp.amount,
      0
    );
    const summaryStart = doc.lastAutoTable.finalY + 10 || 40;

    doc.setFontSize(14);
    doc.text("Özet", 14, summaryStart);
    doc.autoTable({
      startY: summaryStart + 5,
      body: [
        ["Toplam Gelir", totalIncome.toLocaleString("tr-TR")],
        ["Toplam Gider", totalExpenses.toLocaleString("tr-TR")],
        ["Bakiye", (totalIncome - totalExpenses).toLocaleString("tr-TR")],
      ],
    });

    doc.save(`${currentUser.name}_Finansal_Rapor.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Raporu PDF Olarak İndir
    </button>
  );
};

export default PDFDownload;
