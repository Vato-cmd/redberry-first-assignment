import { useState, useEffect } from "react";
import { getTopics } from "../api/courses";
import { useFilters } from "../context/FilterContext";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const { selectedCategoryIds, selectedTopicIds, setSelectedTopicIds } =
    useFilters();

  useEffect(() => {
    async function loadTopics() {
      const topicsData = await getTopics(selectedCategoryIds);
      setTopics(topicsData);
    }
    loadTopics();
  }, [selectedCategoryIds]);

  function handleToggleTopic(topicId) {
    setSelectedTopicIds((prev) => {
      return prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
    });
  }
  return (
    <div>
      <h1 className="text-[#666666] text-[18px] font-medium mb-6">Topics</h1>
      <div className="flex gap-2 flex-wrap w-77.25">
        {topics.map((topic) => {
          const isSelected = selectedTopicIds.includes(topic.id);
          return (
            <label
              key={topic.id}
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
                onChange={() => handleToggleTopic(topic.id)}
              />
              <span
                className={`text-[16px] font-medium transition-colors duration-300
    ${isSelected ? "text-[#281ED2]" : "text-[#525252] group-hover:text-[#281ED2]"}`}
              >
                {topic.name}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
