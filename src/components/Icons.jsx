import { useState, useEffect } from "react";
import { getCategories } from "../api/courses";
import { iconFinder } from "../utils/iconFinder";
import { useFilters } from "../context/FilterContext";

import LoadingState from "../components/LoadingState";

export default function Icons() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedCategoryIds, setSelectedCategoryIds } = useFilters();

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  function handleToggleCategory(categoryId) {
    setSelectedCategoryIds((prev) => {
      return prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
    });
  }

  if (isLoading) {
    return <LoadingState />;
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
              className={`group bg-[#FFFFFF] rounded-xl py-2 px-3 cursor-pointer transition-all duration-300 ease-in-out
              ${
                isSelected
                  ? "bg-[#EEEDFC] border border-[#281ED2]"
                  : "hover:bg-[#DDDBFA]"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => handleToggleCategory(category.id)}
              />
              <p
                className={`flex items-center gap-2.5 text-[16px] font-medium transition-colors duration-300
                ${
                  isSelected
                    ? "text-[#281ED2]"
                    : "text-[#525252] group-hover:text-[#281ED2]"
                }`}
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
