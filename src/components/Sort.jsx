import { useFilters } from "../context/FilterContext";
import { useState } from "react";
import arrowDownThick from "../assets/arrowDownThick.svg";
import Button from "./UI/Button";

export default function Sort() {
  const [open, setOpen] = useState(false);
  const { sort, setSort } = useFilters();
  const options = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Most Popular", value: "popular" },
    { label: "Title: A-Z", value: "title_asc" },
  ];

  const selected =
    options.find((option) => option.value === sort) || options[0];

  return (
    <div className="relative ml-auto mb-8 w-fit">
      <Button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg bg-[#ffff] h-12.25 py-1.75 px-5"
      >
        <span className="text-[#666666] text-[16px] font-medium ">
          Sort By:
        </span>
        <span className={`text-[16px] font-medium text-[#4F46E5]`}>
          {selected.label}
        </span>
        <img src={arrowDownThick} alt="arrow down" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-[3.5px] bg-[#ffff] rounded-[10px]">
          {options.map((option) => {
            return (
              <Button
                key={option.value}
                onClick={() => {
                  setSort(option.value);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-[#666666] hover:bg-[#dddbfa] hover:text-[#4F46E5] text-[16px] font-medium"
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
