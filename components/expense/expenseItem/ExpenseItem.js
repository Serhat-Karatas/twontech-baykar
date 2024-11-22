"use client";
import React, { useState } from "react";
import { useBudget } from "@/app/context/Context";
import Button from "@/components/common/button/Button";
import editIcon from "@/public/icon-edit.svg";
import deleteIcon from "@/public/icon-delete.svg";

const ExpenseItem = ({
  id,
  description,
  amount,
  date,
  category,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedAmount, setEditedAmount] = useState(amount);
  const [editedDate, setEditedDate] = useState(date);
  const [editedCategory, setEditedCategory] = useState(category);

  const { currentUser } = useBudget();
  const categories = currentUser?.categories || [];

  const handleSave = () => {
    onEdit(id, {
      description: editedDescription,
      amount: editedAmount,
      date: editedDate,
      category: editedCategory,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1100px] bg-gray-100 p-4 border-b-white border-2 rounded-lg shadow">
      {!isEditing ? (
        <div className="flex items-center">
          <p className="w-1/4">{description}</p>
          <p className="w-1/6 text-start">{amount.toFixed(2)}</p>
          <p className="w-1/6 text-start">
            {new Date(date).toLocaleDateString()}
          </p>
          <p className="w-1/6 text-start">{category}</p>
          <div className="w-1/4 flex justify-end gap-4">
            <Button
              image={{ src: deleteIcon, alt: "delete" }}
              text="Sil"
              isRed={true}
              click={() => onDelete(id)}
            />
            <Button
              image={{ src: editIcon, alt: "edit" }}
              text="Düzenle"
              isRed={false}
              click={() => setIsEditing(true)}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full max-w-[1100px] gap-4 px-4 bg-gray-200">
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Açıklama"
          />
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(parseFloat(e.target.value))}
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Tutar"
          />
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md h-full"
          >
            <option value="">Kategori Seç</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-4">
            <Button
              text="İptal"
              isRed={true}
              click={() => setIsEditing(false)}
            />
            <Button text="Kaydet" isRed={false} click={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseItem;
