import { useState, createContext, useContext } from "react";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState([]);
  const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilters =
    selectedCategoryIds.length +
    selectedTopicIds.length +
    selectedInstructorIds.length;

  function resetFilters() {
    setSelectedCategoryIds([]);
    setSelectedTopicIds([]);
    setSelectedInstructorIds([]);
    setSort("");
    setCurrentPage(1);
  }

  return (
    <FilterContext.Provider
      value={{
        selectedCategoryIds,
        selectedTopicIds,
        selectedInstructorIds,
        sort,
        setSelectedCategoryIds,
        setSelectedTopicIds,
        setSelectedInstructorIds,
        setSort,
        resetFilters,
        activeFilters,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);

  return context;
}
