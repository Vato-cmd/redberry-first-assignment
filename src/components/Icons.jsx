import { useState, useEffect } from "react";
import { getCategories } from "../api/courses";
import { iconFinder } from "../utils/iconFinder";

export default function Icons({ selectedCategoryIds, setSelectedCategoryIds }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    }
    loadCategories();
  }, []);

  console.log(selectedCategoryIds);

  function handleToggleCategory(categoryId) {
    setSelectedCategoryIds((prev) => {
      return prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
    });
  }

  return (
    <div>
      <h1 className="text-[#666666] text-[18px] font-medium mb-6">
        Categories
      </h1>
      <div className="flex gap-2 flex-wrap w-77.25 mb-14">
        {categories.map((category) => {
          const Icon = iconFinder[category.name.toLowerCase().replace(" ", "")];
          const isSelected = selectedCategoryIds.includes(category.id);

          return (
            <label
              key={category.id}
              className={`bg-[#FFFFFF] rounded-xl py-2 px-3 group 
                           transform-all duration-300 ease-in-out cursor-pointer
                           ${isSelected ? "bg-[#EEEDFC] text-[#281ED2] border border-[#281ED2]" : "hover:bg-[#DDDBFA]"}
                           `}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => handleToggleCategory(category.id)}
              />
              <p
                className={`flex items-center gap-2.5 text-[#525252] text-[16px] 
                  font-medium group-hover:text-[#281ED2] ${isSelected ? "text-[#281ED2]" : "text-[#525252]"}`}
              >
                {Icon && <Icon className="w-6 h-6" />}
                {category.name}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );
}
