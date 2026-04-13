import { useEffect, useState } from "react";
import { getEnrolledCourses } from "../api/enroll";
import { useAuth } from "../context/AuthContext";
import { usePanel } from "../context/EnrolledCoursesPanelContext";
import { formatSessionTypeName } from "../utils/scheduleHelpers";
import { getCourseById } from "../api/courses";
import { calculateAvgRating } from "../utils/calculateAvgRating";

import star from "../assets/star.svg";
import calendar from "../assets/calendar.svg";
import clock from "../assets/clock.svg";
import inperson from "../assets/inperson.svg";
import location from "../assets/location.svg";
import PackageOpen from "../assets/PackageOpen.svg";

import { Link } from "react-router-dom";
import Button from "./UI/Button";

export default function EnrolledCoursesPanel() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState("");

  const { isAuthorized, token } = useAuth();
  const { closeEnrolledCoursesPanel, isEnrolledCoursesPanelOpen, refreshKey } =
    usePanel();
  useEffect(() => {
    if (!isAuthorized || !token) return;

    async function loadEnrolledCourses() {
      try {
        setError("");
        const data = await getEnrolledCourses(token);

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

        setEnrolledCourses(enrichedCourses);
      } catch (error) {
        setError(error.message || "Failed to load enrolled courses");
      }
    }

    loadEnrolledCourses();
  }, [token, isAuthorized, isEnrolledCoursesPanelOpen, refreshKey]);
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300
            ${isEnrolledCoursesPanelOpen ? "pointer-events-auto bg-[#b8b8b8]/50" : "pointer-events-none bg-transparent"} 
    `}
      onClick={closeEnrolledCoursesPanel}
    >
      <section
        className={`w-198.5 h-screen bg-[#F5F5F5] fixed right-0 top-0 overflow-y-auto no-scrollbar transition-transform duration-300
            ${isEnrolledCoursesPanelOpen ? "translate-x-0" : "translate-x-full"}
            flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {error && <p className="flex items-center">{error}</p>}

        <div className="flex items-center justify-between px-14.25 pt-10.5">
          <h1 className="text-[#0A0A0A] font-semibold text-[40px] flex-start">
            Enrolled Courses
          </h1>
          <p className="text-[16px] font-medium text-[#0A0A0A]">
            Total Enrollments{" "}
            <span className="font-semibold">{enrolledCourses.length}</span>
          </p>
        </div>
        {enrolledCourses.length > 0 ? (
          <div className="ml-[73.5px] mr-[97.5px]">
            {enrolledCourses.map((enrolledCourse) => {
              return (
                <Link
                  key={enrolledCourse.id}
                  to={`/courses/${enrolledCourse.course.id}`}
                  onClick={closeEnrolledCoursesPanel}
                >
                  <div className="bg-[#FFFFFF] rounded-xl p-5 w-155.75 h-73.75 mt-8 hover:shadow-[4px_4px_8px_rgba(0,0,0,0.06)]">
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
                          <p className="flex items-center text-[#525252] text-[14px] font-medium gap-1">
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
                          <img
                            className="w-4 h-4"
                            src={calendar}
                            alt="calendar"
                          />
                          {enrolledCourse.schedule.weeklySchedule.label.replace(
                            " - ",
                            "-",
                          )}
                        </p>
                        <p className="flex gap-2 items-center text-[#666666] text-[14px] font-normal h-6.5">
                          <img className="w-4 h-4" src={clock} alt="calendar" />
                          {enrolledCourse.schedule.timeSlot.label
                            .replace("(", "")
                            .replace(")", "")}
                        </p>

                        <p className="flex gap-2 items-center text-[#666666] text-[14px] font-normal h-6.5">
                          <img
                            className="w-4 h-4"
                            src={inperson}
                            alt="calendar"
                          />
                          {formatSessionTypeName(
                            enrolledCourse.schedule.sessionType.name,
                          ).replace("-", " ")}
                        </p>
                        <p className="flex gap-2 items-center text-[#666666] text-[14px] font-normal h-6.5">
                          {enrolledCourse.schedule.location && (
                            <img
                              className="w-4 h-4"
                              src={location}
                              alt="calendar"
                            />
                          )}
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
                      <div>
                        <Button className="flex items-center justify-center border-2 border-[#958FEF] text-[#4F46E5] text-[16px] font-medium rounded-lg h-12 w-29.25 hover:text-[#FFFF] hover:border-[#281ED2] hover:bg-[#4f46e5]">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <img
              className="w-32.5 h-33 mb-1"
              src={PackageOpen}
              alt="empty box logo"
            />
            <h1 className="text-[#130E67] font-semibold text-[24px] mb-2">
              No Enrolled Courses Yet
            </h1>
            <p className="text-[#130E67] font-medium text-[14px] w-68.5 text-center mb-3">
              Your learning journey starts here! Browse courses to get started.
            </p>
            <Link
              to="/courses"
              className="bg-[#4F46E5] text-white rounded-lg w-43.75 h-14.5 flex items-center justify-center"
              onClick={closeEnrolledCoursesPanel}
            >
              Browse Courses
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
