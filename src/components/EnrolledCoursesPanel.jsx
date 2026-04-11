import { useEffect, useState } from "react";
import { getEnrolledCourses } from "../api/enroll";
import { useAuth } from "../context/AuthContext";
import { usePanel } from "../context/EnrolledCoursesPanelContext";
import star from "../assets/star.svg";
import calendar from "../assets/calendar.svg";
import clock from "../assets/clock.svg";
import inperson from "../assets/inperson.svg";
import location from "../assets/location.svg";

import { Link } from "react-router-dom";

export default function EnrolledCoursesPanel() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthorized, token } = useAuth();
  const { closeEnrolledCoursesPanel, isEnrolledCoursesPanelOpen } = usePanel();

  useEffect(() => {
    if (!isAuthorized || !token) return;

    async function loadEnrolledCourses() {
      try {
        setError("");
        setIsLoading(true);

        const data = await getEnrolledCourses(token);
        setEnrolledCourses(data.data);
      } catch (error) {
        setError(error.message || "Failed to load enrolled courses");
      } finally {
        setIsLoading(false);
      }
    }

    loadEnrolledCourses();
  }, [token, isAuthorized]);
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300
            ${isEnrolledCoursesPanelOpen ? "pointer-events-auto bg-[#b8b8b8]/50" : "pointer-events-none bg-transparent"} 
    `}
      onClick={closeEnrolledCoursesPanel}
    >
      <section
        className={`w-198.5 h-screen bg-[#F5F5F5] fixed right-0 top-0 overflow-y-auto transition-transform duration-300
            ${isEnrolledCoursesPanelOpen ? "translate-x-0" : "translate-x-full"}
            `}
        onClick={(e) => e.stopPropagation()}
      >
        {error && <p>{error}</p>}
        {isLoading && <p>loading enrolled courses...</p>}

        <div className="flex items-center justify-between px-14.25 pt-10.5">
          <h1 className="text-[#0A0A0A] font-semibold text-[40px] flex-start">
            Enrolled Courses
          </h1>
          <p className="text-[16px] font-medium text-[#0A0A0A]">
            Total Enrollments: {enrolledCourses.length}
          </p>
        </div>
        <div className="ml-[73.5px] mr-[97.5px]">
          {enrolledCourses.map((enrolledCourse) => {
            console.log(enrolledCourse.schedule.location);
            return (
              <div
                key={enrolledCourse.id}
                className="bg-[#FFFFFF] rounded-xl p-5 w-155.75 h-73.75 mt-8"
              >
                <div className="flex gap-4 mb-2">
                  <img
                    src={enrolledCourse.course.image}
                    alt="enrolled course image"
                    className="w-67.25 h-47.75 rounded-[10px] object-cover"
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
                    <p className="text-[#141414] text-[20px] font-semibold mb-2 h-12 w-64.25">
                      {enrolledCourse.course.title}
                    </p>
                    <p className="flex gap-2 items-center text-[#666666] text-[14px] font-normal h-6.5">
                      <img className="w-4 h-4" src={calendar} alt="calendar" />
                      {enrolledCourse.schedule.weeklySchedule.label}
                    </p>
                    <p className="flex gap-2 items-center text-[#666666] text-[14px] font-normal h-6.5">
                      <img className="w-4 h-4" src={clock} alt="calendar" />
                      {enrolledCourse.schedule.timeSlot.label}
                    </p>

                    <p className="flex gap-2 items-center text-[#666666] text-[14px] font-normal h-6.5">
                      <img className="w-4 h-4" src={inperson} alt="calendar" />
                      {enrolledCourse.schedule.sessionType.name}
                    </p>
                    <p className="flex gap-2 items-center text-[#666666] text-[14px] font-normal h-6.5">
                      <img className="w-4 h-4" src={location} alt="calendar" />
                      {enrolledCourse.schedule.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#141414] text-3 font-medium mb-1">
                      {enrolledCourse.progress}% Complete
                    </p>
                    <div className="bg-[#DDDBFA] w-110.5 h-[15.126176834106445px] rounded-[30px] ">
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
      </section>
    </div>
  );
}
