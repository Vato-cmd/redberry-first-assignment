import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Button from "./UI/Button";

function getVisiblePages(startPage, lastPage) {
  const pages = [];
  const endPage = Math.min(startPage + 2, lastPage - 1);

  if (startPage > 1) {
    pages.push("left-dots");
  }

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  if (endPage < lastPage - 1) {
    pages.push("right-dots");
  }

  if (lastPage > endPage) {
    pages.push(lastPage);
  }
  console.log(pages);

  return pages;
}

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  startPage,
  setStartPage,
}) {
  if (lastPage <= 1) return null;

  const pages = getVisiblePages(startPage, lastPage);
  const lastGroupStart = Math.max(1, lastPage - 3);

  function handlePageClick(page) {
    onPageChange(page);

    if (page !== lastPage) {
      if (page >= 1 && page <= 2) {
        setStartPage(1);
      } else if (page === 3) {
        setStartPage(4);
      } else if (page >= lastGroupStart) {
        setStartPage(lastGroupStart);
      } else {
        setStartPage(page);
      }
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        type="button"
        onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-sm border hover:text-[white] hover:bg-[#281ed2] border-[#D1D1D1] bg-white text-[16px] font-medium  text-[#4F46E5] disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {pages.map((item) => {
        if (item === "left-dots") {
          return (
            <Button
              key="left-dots"
              type="button"
              onClick={() => setStartPage(Math.max(1, startPage - 3))}
              className="w-10 h-10 rounded-sm border border-[#D1D1D1] bg-white text-[#4F46E5] text-[16px] font-medium hover:text-[white] hover:bg-[#281ed2]"
            >
              ...
            </Button>
          );
        }

        if (item === "right-dots") {
          return (
            <Button
              key="right-dots"
              type="button"
              onClick={() =>
                setStartPage(Math.min(lastGroupStart, startPage + 3))
              }
              className="w-10 h-10 rounded-sm border border-[#D1D1D1] bg-white text-[#4F46E5] text-[16px] font-medium hover:text-[white] hover:bg-[#281ed2]"
            >
              ...
            </Button>
          );
        }

        const isActive = currentPage === item;

        return (
          <Button
            key={item}
            type="button"
            onClick={() => handlePageClick(item)}
            className={`w-10 h-10 rounded-sm border border-[#D1D1D1] text-[16px] font-medium ${
              isActive
                ? "bg-[#281ed2] text-white"
                : "bg-white text-[#4F46E5] hover:text-[white] hover:bg-[#281ed2]"
            }`}
          >
            {item}
          </Button>
        );
      })}

      <Button
        type="button"
        onClick={() => handlePageClick(Math.min(lastPage, currentPage + 1))}
        disabled={currentPage === lastPage}
        className="w-10 h-10 flex items-center justify-center rounded-sm border hover:text-[white] hover:bg-[#281ed2] border-[#D1D1D1] bg-white text-[16px] font-medium  text-[#4F46E5] disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
