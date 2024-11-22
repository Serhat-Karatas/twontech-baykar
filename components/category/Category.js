"use client";
import React from "react";
import CategoryItem from "@/components/category/categoryItem/CategoryItem";
import CategoryEditor from "@/components/category/newCategoryEditor/CategoryEditor";
import { useBudget } from "@/app/context/Context";

const Category = () => {
  const { currentUser, addCategory, deleteCategory, editCategory } =
    useBudget();

  if (!currentUser)
    return <div>Cookie den ötürü yüklenmedi, lüten refresh atınız.</div>;

  const handleAddCategory = (category) => addCategory(category);
  const handleDeleteCategory = (categoryId) => deleteCategory(categoryId);
  const handleEditCategory = (name, updatedCategory) =>
    editCategory(name, updatedCategory);

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <CategoryEditor onSubmit={handleAddCategory} />
      <div className="flex flex-col items-center w-full">
        {currentUser.categories.length > 0 ? (
          currentUser.categories.map((item, index) => (
            <CategoryItem
              key={item.id}
              name={item.name}
              limit={item.limit}
              onDelete={handleDeleteCategory}
              onEdit={handleEditCategory}
            />
          ))
        ) : (
          <p>Henüz bir kategori eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
