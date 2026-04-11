import { useState, useEffect } from "react";
import { getCoursesInProgress } from "../api/enroll";
import { getCourseById } from "../api/courses";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { calculateAvgRating } from "../utils/calculateAvgRating";

import star from "../assets/star.svg";

export default function CoursesInProgress() {
  const [coursesInProgress, setCoursesInProgress] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, isAuthorized } = useAuth();
  console.log(coursesInProgress);

  useEffect(() => {
    if (!isAuthorized || !token) return;

    async function loadCoursesInProgress() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getCoursesInProgress({ token });

        const enrichedCourses = await Promise.all(
          data.data.map(async (enrolledCourse) => {
            const fullCourse = await getCourseById(
              enrolledCourse.course.id,
              token,
            );

            const avgRating = calculateAvgRating(fullCourse.reviews);

            return {
              ...enrolledCourse,
              course: {
                ...enrolledCourse.course,
                avgRating,
              },
            };
          }),
        );

        setCoursesInProgress(enrichedCourses);
      } catch (error) {
        setError(error.message || "Failed to fetch in-progress course");
      } finally {
        setIsLoading(false);
      }
    }

    loadCoursesInProgress();
  }, [token, isAuthorized]);

  return (
    <div className="w-391.5 mx-auto mt-16">
      <h1 className="text-[#000000] text-[40px] font-semibold ">
        Continue Learning
      </h1>
      <div className="flex justify-between items-center">
        <p className="text-[#3D3D3D] text-[18px] font-medium">
          Pick up where you left
        </p>
        <p className="text-[#4F46E5] text-[20px] font-medium underline underline-offset-[25%] cursor-pointer">
          See All
        </p>
      </div>
      <div className="flex gap-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading && <p>Loading...</p>}
        {coursesInProgress.map((enrolledCourse) => {
          return (
            <div
              key={enrolledCourse.id}
              className="bg-[#FFFFFF] rounded-xl p-5 w-126.5 h-54.75 mt-8"
            >
              <div className="flex gap-4 mb-2">
                <img
                  src={enrolledCourse.course.image}
                  alt="enrolled course image"
                  className="w-35 h-30.75 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2.25">
                    <p className="text-[#8A8A8A] text-[14px] font-medium">
                      Lecturer{" "}
                      <span className="text-[#666666] font-medium">
                        {enrolledCourse.course.instructor.name}
                      </span>
                    </p>
                    <p className="flex text-[#525252] text-[14px] font-medium gap-1">
                      <img
                        className="w-[16.62px] h-[16.62px]"
                        src={star}
                        alt="star icon"
                      />
                      {enrolledCourse.course.avgRating}
                    </p>
                  </div>
                  <p className="text-[#141414] text-[20px] font-semibold">
                    {enrolledCourse.course.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#141414] text-3 font-medium mb-1">
                    {enrolledCourse.progress}% Complete
                  </p>
                  <div className="bg-[#DDDBFA] w-84 h-[15.126176834106445px] rounded-[30px] ">
                    <div
                      className="bg-[#4F46E5] h-full rounded-[30px]"
                      style={{ width: `${enrolledCourse.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Link
                  to={`/courses/${enrolledCourse.course.id}`}
                  className="flex justify-center border-2 border-[#958FEF] text-[#4F46E5] text-[16px] font-medium rounded-lg py-3 px-4 h-12 w-22.5 hover:text-[#FFFF] hover:border-[#281ED2] hover:bg-[#4f46e5]"
                >
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
