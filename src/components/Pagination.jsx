import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-10">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 flex items-center justify-center border border-[#D1D1D1] bg-white text-[#8A8A8A] disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {Array.from({ length: lastPage }, (_, index) => {
        const page = index + 1;
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 border border-l-0 border-[#D1D1D1] text-[16px] font-medium ${
              isActive ? "bg-[#4F46E5] text-white" : "bg-white text-[#4F46E5]"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="w-12 h-12 flex items-center justify-center border border-l-0 border-[#D1D1D1] bg-white text-[#4F46E5] disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
