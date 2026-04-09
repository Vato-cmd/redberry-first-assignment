import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourseById } from "../api/courses";
import { useAuth } from "../context/AuthContext";
import { useCourse } from "../context/CourseContext";

import calendar from "../assets/calendar.svg";
import star from "../assets/star.svg";
import clock from "../assets/clock.svg";
import developmentLogo from "../assets/development-logo.svg";

import Schedule from "../components/Schedule";
import IncompleteProfileComponent from "../components/incompleteProfileComponent";
import UnAuthorizedUserComponent from "../components/UnAuthorizedUserComponent";
import EnrolledCourseCard from "../components/EnrolledCourseCard";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { isAuthorized, isProfileComplete, token } = useAuth();
  const { setCurrentCourse } = useCourse();

  async function loadCourseDetails() {
    const data = await getCourseById(id, token);
    setCourse(data);
    setCurrentCourse(data);
  }

  useEffect(() => {
    loadCourseDetails();
  }, [id, token]);

  if (!course) return <p>Loading...</p>;

  const avgRating =
    course?.reviews.length === 0
      ? 0
      : course.reviews.reduce((curr, total) => curr + total.rating, 0) /
        course.reviews.length;
  return (
    <section className="w-full px-44.25 mt-16">
      <div>
        <h1 className="text-[#141414] font-semibold text-[40px] mb-6">
          {course.title}
        </h1>
        <div className="w-full flex gap-33.25">
          <div className="w-225.75">
            <img
              className="rounded-[10px] w-full h-[475.15px] object-cover"
              src={course.image}
              alt={course.title}
            />
            <div className="mt-[26.5px] flex justify-between gap-4 mb-4.5">
              <div className="flex justify-between items-center flex-1 text-[#525252] font-medium">
                <div className="flex items-center gap-3.75">
                  <p className="flex items-center gap-1 text-[14px]">
                    <img className="w-6 h-6" src={calendar} alt="calendar" />
                    {course.durationWeeks} Weeks
                  </p>
                  <p className="flex items-center gap-1 text-[14px]">
                    <img className="w-6 h-6" src={clock} alt="clock" />
                    {course.hours} Hours
                  </p>
                </div>
                <p className="flex items-center gap-1 text-[14px]">
                  <img className="w-6 h-6" src={star} alt="star" />
                  {avgRating.toFixed(1)}
                </p>
              </div>
              <div className="bg-[#FFFFFF] px-3 py-2 rounded-xl">
                <p className="flex items-center gap-2.5 text-[#666666] font-medium">
                  <img
                    className="w-6 h-6"
                    src={developmentLogo}
                    alt="development"
                  />
                  {course.category.name}
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-3 text-[16px] font-medium text-[#666666] bg-[#FFFFFF] px-3 py-2 rounded-xl mb-4.5 cursor-pointer hover:text-[#4F46E5] hover:bg-[#dddbfa]">
              <img
                className="w-7.5 h-7.5 rounded object-cover"
                src={course.instructor.avatar}
                alt="Instructor"
              />
              <p>{course.instructor.name}</p>
            </div>

            <h2 className="text-[#8A8A8A] text-[20px] font-semibold mb-6">
              Course Description
            </h2>
            <p className="text-[#525252] font-medium text-[16px]">
              {course.description}
            </p>
          </div>
          <div className="w-132.5">
            {course.enrollment ? (
              <EnrolledCourseCard enrollment={course.enrollment} />
            ) : (
              <Schedule
                courseId={id}
                basePrice={course.basePrice}
                onEnrollSuccess={loadCourseDetails}
              />
            )}
            {isAuthorized && !isProfileComplete && (
              <IncompleteProfileComponent />
            )}
            {!isAuthorized && <UnAuthorizedUserComponent />}
          </div>
        </div>
      </div>
    </section>
  );
}
