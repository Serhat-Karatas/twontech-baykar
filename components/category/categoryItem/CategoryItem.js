"use client";
import React, { useState } from "react";
import Button from "@/components/common/button/Button";
import editIcon from "@/public/icon-edit.svg";
import deleteIcon from "@/public/icon-delete.svg";

const CategoryItem = ({ name, limit, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedLimit, setEditedLimit] = useState(limit);

  const handleSave = () => {
    onEdit(name, {
      name: editedName,
      limit: editedLimit,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-gray-100 p-4 border-b-white border-2 rounded-lg shadow">
      {!isEditing ? (
        <div className="flex items-center">
          <p className="w-full">{name}</p>
          <p className="w-full text-start">{limit.toFixed(2)}</p>
          <div className="w-full flex justify-end gap-4">
            <Button
              image={{ src: deleteIcon, alt: "delete" }}
              text="Sil"
              isRed={true}
              click={() => onDelete(name)}
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
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Kateogri Adı"
          />
          <input
            type="number"
            value={editedLimit}
            onChange={(e) => setEditedLimit(parseFloat(e.target.value))}
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Limit"
          />
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

export default CategoryItem;
