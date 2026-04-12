import { useState, useEffect } from "react";
import { getTopics } from "../api/courses";

export default function Topics({ categoryIds = [] }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function loadTopics() {
      const topicsData = await getTopics(categoryIds);
      setTopics(topicsData);
    }
    loadTopics();
  }, [categoryIds]);

  return (
    <div>
      <h1 className="text-[#666666] text-[18px] font-medium mb-6">Topics</h1>
      <div className="flex gap-2 flex-wrap w-77.25">
        {topics.map((topic) => {
          return (
            <div
              key={topic.id}
              className="bg-[#FFFFFF] rounded-xl flex items-center gap-2.5 py-2 px-3 hover:bg-[#dddbfa] cursor-pointer transform-all duration-300 ease-in-out"
            >
              <span className="text-[#525252] text-[16px] font-medium hover:text-[#281ED2]">
                {topic.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
