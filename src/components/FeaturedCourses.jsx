import star from "../assets/star.svg";
import Button from "./UI/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCourse } from "../context/CourseContext";

export default function FeaturedCourses() {
  const {
    featuredCourses,
    loadFeaturedCourses,
    isLoadingFeaturedCourse,
    error,
  } = useCourse();

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  if (isLoadingFeaturedCourse) return <p>Loading featured courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="w-391.5 mt-16 mx-auto">
      <div className="mb-8">
        <h1 className="text-[40px] text-[#0A0A0A] font-semibold">
          Start Learning Today
        </h1>
        <p className="text-[#3D3D3D] text-[18px] font-medium">
          Choose from our most popular courses and begin your journey
        </p>
      </div>

      <div className="w-full flex gap-6 items-stretch">
        {featuredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="block w-126.5"
          >
            <div className="bg-white rounded-xl p-6 cursor-pointer h-full flex flex-col">
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
          </Link>
        ))}
      </div>
    </section>
  );
}
