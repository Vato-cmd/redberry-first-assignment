import { useState, createContext, useContext } from "react";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState([]);
  const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
  const [sort, setSort] = useState("");

  const activeFilters =
    selectedCategoryIds.length +
    selectedTopicIds.length +
    selectedInstructorIds.length;

  function resetFilters() {
    setSelectedCategoryIds([]);
    setSelectedTopicIds([]);
    setSelectedInstructorIds([]);
    setSort("");
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
