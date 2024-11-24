"use client";
import React, { useState } from "react";
import Button from "@/components/common/button/Button";
import editIcon from "@/public/icon-edit.svg";
import deleteIcon from "@/public/icon-delete.svg";

const IncomeItem = ({ id, description, amount, date, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedAmount, setEditedAmount] = useState(amount);
  const [editedDate, setEditedDate] = useState(date);

  const handleSave = () => {
    onEdit(id, {
      description: editedDescription,
      amount: editedAmount,
      date: editedDate,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1100px] dark:bg-black bg-gray-100 p-4 border-b-white border-2 rounded-lg shadow">
      {!isEditing ? (
        <div className="flex w-full flex-col sm:flex-row items-center font-medium gap-3 sm:gap-0">
          <span className="flex w-full">
            <p className="w-full">{description}</p>
            <p className="w-full text-start">{amount.toFixed(2)}</p>
          </span>
          <span className="flex w-full">
            <p className="w-full text-start">
              {new Date(date).toLocaleDateString()}
            </p>
            <div className="flex w-full justify-start sm:justify-end gap-4">
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
          </span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center w-full max-w-[1100px] gap-4 p-4 dark:bg-black bg-gray-200 text-black">
          <span className="flex w-full gap-4">
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Açıklama"
            />
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(parseFloat(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Tutar"
            />
          </span>
          <span className="flex w-full gap-4">
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <div className="flex w-full justify-start sm:justify-end gap-4">
              <Button
                text="İptal"
                isRed={true}
                click={() => setIsEditing(false)}
              />
              <Button text="Kaydet" isRed={false} click={handleSave} />
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default IncomeItem;
