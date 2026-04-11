import { useState, useEffect } from "react";
import { getCategories } from "../api/courses";
import { iconFinder } from "../utils/iconFinder";

export default function Icons() {
  const [error, setError] = useState("");
  const [iconsLoading, setIconsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        setError("");
        setIconsLoading(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message || "Failed to load categories");
      } finally {
        setIconsLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (iconsLoading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1 className="text-[#666666] text-[18px] font-medium mb-6">
        Categories
      </h1>
      <div className="flex gap-2 flex-wrap w-77.25">
        {categories.map((category) => {
          const Icon = iconFinder[category.name.toLowerCase()];

          return (
            <div
              key={category.id}
              className="bg-[#FFFFFF] rounded-xl flex items-center gap-2.5 py-2 px-3"
            >
              {Icon && <Icon className="w-6 h-6 text-[#525252]" />}
              <span className="text-[#525252] text-[16px] font-medium">
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
