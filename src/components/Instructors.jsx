import { useState, useEffect } from "react";
import { getInstructors } from "../api/courses";
import { useFilters } from "../context/FilterContext";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const { selectedInstructorIds, setSelectedInstructorIds } = useFilters();

  useEffect(() => {
    async function loadInstructors() {
      const instructorsData = await getInstructors();
      setInstructors(instructorsData);
    }
    loadInstructors();
  }, []);

  function handleToggleInstructors(instructorId) {
    setSelectedInstructorIds((prev) => {
      return prev.includes(instructorId)
        ? prev.filter((id) => id !== instructorId)
        : [...prev, instructorId];
    });
  }
  return (
    <div className="mt-14">
      <h1 className="text-[#666666] text-[18px] font-medium mb-6">
        Instructors
      </h1>
      <div className="flex gap-2 flex-wrap w-77.25 mb-14">
        {instructors.map((instructor) => {
          const isSelected = selectedInstructorIds.includes(instructor.id);
          return (
            <label
              key={instructor.id}
              className={`group bg-[#FFFFFF] rounded-xl flex items-center gap-2.5 py-2 px-3
    cursor-pointer transition-all duration-300 ease-in-out
    ${
      isSelected ? "bg-[#EEEDFC] border border-[#281ED2]" : "hover:bg-[#DDDBFA]"
    }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => handleToggleInstructors(instructor.id)}
              />
              <img
                className="w-7.5 h-7.5 rounded-sm object-cover"
                src={instructor.avatar}
                alt="instructor avatar"
              />
              <p
                className={`flex items-center gap-2.5 text-[16px] font-medium transition-colors duration-300
    ${
      isSelected
        ? "text-[#281ED2]"
        : "text-[#525252] group-hover:text-[#281ED2]"
    }`}
              >
                {instructor.name}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );
}
