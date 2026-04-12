import Icons from "./Icons";
import Topics from "./Topics";
import Instructors from "./Instructors";
import { useState } from "react";

export default function Filters() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  return (
    <div>
      <Icons
        selectedCategoryIds={selectedCategoryIds}
        setSelectedCategoryIds={setSelectedCategoryIds}
      />
      <Topics categoryIds={selectedCategoryIds} />
      <Instructors />
    </div>
  );
}
