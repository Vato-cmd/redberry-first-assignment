import { useState, useEffect } from "react";
import { getInstructors } from "../api/courses";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    async function loadInstructors() {
      const instructorsData = await getInstructors();
      setInstructors(instructorsData);
    }
    loadInstructors();
  }, []);
  return (
    <div className="mt-14">
      <h1 className="text-[#666666] text-[18px] font-medium mb-6">
        Instructors
      </h1>
      <div className="flex gap-2 flex-wrap w-77.25 mb-14">
        {instructors.map((instructor) => {
          return (
            <div
              key={instructor.id}
              className="flex items-center gap-3 bg-[#FFFFFF] rounded-xl py-2 px-3 group hover:bg-[#dddbfa] transform-all duration-300 ease-in-out cursor-pointer"
            >
              <img
                className="w-7.5 h-7.5 rounded-sm object-cover"
                src={instructor.avatar}
                alt="instructor avatar"
              />
              <p className="text-[#666666] text-[16px] font-medium group-hover:text-[#281ED2]">
                {instructor.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
