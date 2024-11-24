"use client";
import React from "react";
import CategoryItem from "@/components/category/categoryItem/CategoryItem";
import CategoryEditor from "@/components/category/newCategoryEditor/CategoryEditor";
import { useBudget } from "@/app/context/Context";

const Category = () => {
  const { currentUser, addCategory, deleteCategory, editCategory } =
    useBudget();

  if (!currentUser)
    return (
      <div>Cookie kaynaklı yüklenmeme olabilir, lütfen sayfayı yenileyiniz</div>
    );

  const handleAddCategory = (category) => addCategory(category);
  const handleDeleteCategory = (categoryId) => deleteCategory(categoryId);
  const handleEditCategory = (name, updatedCategory) =>
    editCategory(name, updatedCategory);

  return (
    <div className="flex flex-col max-w-[1100px] items-center w-full gap-8">
      <h2 className="text-3xl font-bold text-center">Kategori ve Limit Ekle</h2>
      <p className="text-slate-500 px-3 text-center -mt-3">
        Eğer liste yüksekliği 300 px den fazla ise KAYDIRILABİLİR(scrollable)
        bir yapıya dönüşüyor
      </p>
      <CategoryEditor onSubmit={handleAddCategory} />
      <div className="flex flex-col items-center w-full max-h-[300px] overflow-y-auto">
        {currentUser.categories.length > 0 ? (
          currentUser.categories.map((item) => (
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
