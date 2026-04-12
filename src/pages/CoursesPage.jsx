import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courses";
import { iconFinder } from "../utils/iconFinder";

import Icons from "../components/Icons";
import Topics from "../components/Topics";
import Instructors from "../components/Instructors";

import Button from "../components/UI/Button";

import star from "../assets/star.svg";
import divider from "../assets/divider.svg";

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

  if (!courses) return <p>Loading...</p>;
  console.log(courses);

  return (
    <section className="mx-44.25 mt-32.75 flex gap-22.5">
      <div>
        <Icons />
        <Topics />
        <Instructors />
      </div>
      <div className="grid grid-cols-3 gap-6 w-291.75">
        {courses.slice(0, 9).map((course) => {
          const Icon =
            iconFinder[course.category.name.toLowerCase().replace(" ", "")];

          return (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="w-93.25 h-112.75"
            >
              <div className="bg-white h-full rounded-xl p-5 cursor-pointer flex flex-col hover:shadow-[4px_4px_8px_rgba(0,0,0,0.06)]">
                <img
                  className="w-83.25 h-45.25 object-cover rounded-[10px] mb-4.5"
                  src={course.image}
                  alt={course.title}
                />

                <div className="flex items-center justify-between ">
                  <p className="text-[14px] font-medium text-[#ADADAD] flex gap-2">
                    {course.instructor.name}
                    <img src={divider} alt="divider" />
                    <span>{course.durationWeeks} Weeks</span>
                  </p>

                  <div className="flex items-center gap-0.5">
                    <img className="w-4.5 h-4.5" src={star} alt="star" />
                    <p className="text-[#525252] text-[14px] font-medium">
                      {course.avgRating}
                    </p>
                  </div>
                </div>

                <h2 className="text-[24px] text-[#0A0A0A] font-semibold mb-3">
                  {course.title}
                </h2>
                <div className="flex items-center justify-center h-10 w-37.5 gap-1.5 rounded-lg text-[#525252] text-[16px] bg-[#F5F5F5] font-medium">
                  <Icon />
                  <h2>{course.category.name}</h2>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-medium text-[#ADADAD] flex flex-col">
                      Starting from
                      <span className="text-[#3D3D3D] text-[24px] font-semibold">
                        ${course.basePrice}
                      </span>
                    </p>
                  </div>

                  <Button
                    className={`rounded-lg bg-[#4F46E5] text-white font-medium text-[16px] h-12 w-25.75 hover:bg-[#281ED2]`}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
