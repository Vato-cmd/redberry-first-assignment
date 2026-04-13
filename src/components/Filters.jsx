import Icons from "./Icons";
import Topics from "./Topics";
import Instructors from "./Instructors";

import { useFilters } from "../context/FilterContext";

export default function Filters() {
  const { activeFilters } = useFilters();

  return (
    <div>
      <Icons />
      <Topics />
      <Instructors />
      <div className="border-t border-[#ADADAD] pt-4">
        <p className="text-[14px] text-[#8A8A8A] font-medium">
          {activeFilters} Filters Active
        </p>
      </div>
    </div>
  );
}
