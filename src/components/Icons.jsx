import { useState, useEffect } from "react";
import { getCategories } from "../api/courses";
import { iconFinder } from "../utils/iconFinder";

export default function Icons() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    }
    loadCategories();
  }, []);

  return (
    <div>
      <h1 className="text-[#666666] text-[18px] font-medium mb-6">
        Categories
      </h1>
      <div className="flex gap-2 flex-wrap w-77.25 mb-14">
        {categories.map((category) => {
          const Icon = iconFinder[category.name.toLowerCase().replace(" ", "")];
          console.log(category.name.toLowerCase().replace(" ", ""));
          return (
            <div
              key={category.id}
              className="bg-[#FFFFFF] rounded-xl py-2 px-3 group hover:bg-[#dddbfa] transform-all duration-300 ease-in-out cursor-pointer"
            >
              <p className="flex items-center gap-2.5 text-[#525252] text-[16px] font-medium group-hover:text-[#281ED2]">
                <Icon className="w-6 h-6" />
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
