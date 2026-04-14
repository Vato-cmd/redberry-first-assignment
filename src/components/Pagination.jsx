import Button from "./UI/Button";

function getVisiblePages(currentPage, lastPage) {
  const pages = [];

  if (currentPage <= 2) {
    pages.push(1, 2, 3, "right-dots", lastPage);
  } else if (currentPage >= lastPage - 2) {
    pages.push("left-dots", lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
  } else {
    pages.push(
      "left-dots",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "right-dots",
      lastPage,
    );
  }

  return pages;
}

export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  const pages = getVisiblePages(currentPage, lastPage);

  function handlePageClick(page) {
    onPageChange(page);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        type="button"
        onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-sm border hover:text-[white] hover:bg-[#281ed2] border-[#D1D1D1] bg-white text-[16px] font-medium  text-[#4F46E5] disabled:opacity-50"
      >
        <svg
          width="15"
          height="23"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.30131 0.000709453L6.32404 1.01207L2.77291 4.56321L11.6934 4.56321L11.6934 6.04048L2.77291 6.04048L6.32404 9.58594L5.30131 10.603L0.000178512 5.30185L5.30131 0.000709453Z"
            fill="currentColor"
          />
        </svg>
      </Button>

      {pages.map((item, index) => {
        if (item === `left-dots`) {
          return (
            <Button
              key={`left-dots-${index}`}
              type="button"
              onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
              className="w-10 h-10 rounded-sm border border-[#D1D1D1] bg-white text-[#4F46E5] text-[16px] font-medium hover:text-[white] hover:bg-[#281ed2]"
            >
              ...
            </Button>
          );
        }

        if (item === `right-dots`) {
          return (
            <Button
              key={`right-dots-${index}`}
              type="button"
              onClick={() =>
                handlePageClick(Math.min(lastPage, currentPage + 1))
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
        <svg
          width="15"
          height="23"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.39205 10.6028L5.36932 9.59144L8.92045 6.04031H0V4.56303H8.92045L5.36932 1.01758L6.39205 0.00053215L11.6932 5.30167L6.39205 10.6028Z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </div>
  );
}
