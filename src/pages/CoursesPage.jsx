import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courses";

import Button from "../components/UI/Button";

import star from "../assets/star.svg";

export default function CoursesPage() {
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        setError("");
        setIsLoading(true);

        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        setError(error.message || "Failed to load the courses");
      } finally {
        setIsLoading(false);
      }
    }

    loadCourses();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-3 gap-6">
        {courses.map((course) => {
          return (
            <div key={course.id}>
              <div className="bg-white rounded-xl p-6 cursor-pointer h-full flex flex-col hover:shadow-[4px_4px_8px_rgba(0,0,0,0.06)]">
                <img
                  className="w-116.5 h-65.5 object-cover rounded-[10px]"
                  src={course.image}
                  alt={course.title}
                />

                <div className="flex items-center justify-between mt-[16.5px] mb-[12.5px]">
                  <p className="text-[14px] font-medium text-[#8A8A8A]">
                    Lecturer{" "}
                    <span className="font-semibold text-[#666666]">
                      {course.instructor.name}
                    </span>
                  </p>

                  <div className="flex items-center gap-0.5">
                    <img className="w-4.5 h-4.5" src={star} alt="star" />
                    <p className="text-[#525252] text-[14px] font-medium">
                      {course.avgRating}
                    </p>
                  </div>
                </div>

                <h2 className="text-[24px] text-[#141414] font-semibold mb-4">
                  {course.title}
                </h2>

                <p className="text-4 font-medium text-[#666666] mb-6">
                  {course.description}
                </p>

                <div className="flex items-end justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <p className="text-3 font-medium text-[#8A8A8A]">
                      Starting from
                    </p>
                    <h2 className="text-[32px] font-semibold text-[#141414]">
                      ${course.basePrice}
                    </h2>
                  </div>

                  <Button
                    className={`rounded-lg bg-[#4F46E5] text-white font-medium text-[20px] py-4.25 px-6.25 border-2 hover:bg-[#281ED2]`}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
