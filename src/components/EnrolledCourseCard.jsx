import Button from "./UI/Button";

import clock from "../assets/clock.svg";
import calendarDotted from "../assets/dotted-calendar.svg";
import monitor from "../assets/monitor.svg";
import location from "../assets/location.svg";
import hibryd from "../assets/hibryd.svg";
import inperson from "../assets/inperson.svg";
import thickTick from "../assets/thick-tick.svg";
import retake from "../assets/retake.svg";
import cross from "../assets/cross.svg";

import { useModal } from "../context/ModalContext";
import { usePanel } from "../context/EnrolledCoursesPanelContext";

import ReviewSection from "./ReviewSection";

import {
  formatSessionTypeName,
  formatTimeSlotLabel,
} from "../utils/scheduleHelpers";
import { useEnroll } from "../context/EnrollContext";
import { useState } from "react";

export default function EnrolledCourseCard({
  enrollment,
  onEnrollSuccess,
  onEnrollDelete,
  course,
  courseId,
  reviews,
  isRated,
  onReviewSuccess,
}) {
  const { timeRange } = formatTimeSlotLabel(enrollment.schedule.timeSlot.label);
  const { completeCourse, deleteCourse } = useEnroll();
  const { openModal } = useModal();
  const { handlePanelRefreshKey } = usePanel();
  const [isReviewsDisplayed, setIsReviewsDisplayed] = useState(true);

  const progress = enrollment.progress;

  async function handleComplete() {
    try {
      await completeCourse(enrollment.id);
      await onEnrollSuccess?.();
      handlePanelRefreshKey();
      openModal("success", {
        title: course.title,
        courseId: courseId,
        reviews: course.reviews,
        isRated: course.isRated,
        onReviewSuccess: onEnrollSuccess,
      });
    } catch (error) {}
  }

  async function handleDelete() {
    try {
      await deleteCourse(enrollment.id);
      await onEnrollDelete?.();
      handlePanelRefreshKey();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="text-[#525252] text-[20px] font-medium w-118.25 flex flex-col py-4.25 px-6.25">
      <Button
        className={`${progress === 100 ? "text-[#1DC31D] bg-[#dff0df]" : "text-[#736BEA] bg-[#e8e7f4]"} self-start  p-4 rounded-full mb-5.5`}
      >
        <p>{progress === 100 ? "Completed" : "Enrolled"}</p>
      </Button>
      <div className="flex flex-col gap-5.5 mb-12">
        <p className="flex items-center gap-3">
          <img src={calendarDotted} alt="calendar dotted" />
          {enrollment.schedule.weeklySchedule.label.replace(" - ", "-")}
        </p>
        <p className="flex items-center gap-3">
          <img src={clock} alt="clock" />
          {timeRange}
        </p>
        <p className="flex items-center gap-3">
          <img
            src={
              enrollment.schedule.sessionType.name === "in_person"
                ? inperson
                : enrollment.schedule.sessionType.name === "hybrid"
                  ? hibryd
                  : monitor
            }
            alt="monitor"
          />
          {formatSessionTypeName(enrollment.schedule.sessionType.name)}
        </p>
        {enrollment.schedule.location && (
          <p className="flex items-center gap-3">
            <img src={location} alt="location" />
            {enrollment.schedule.location}
          </p>
        )}
      </div>
      <div className="mb-10">
        <p className="text-[#666666] text-[20px] font-semibold mb-3">
          {enrollment.progress}% Complete
        </p>
        <div className="h-[23.45px] rounded-[30px] bg-[#DDDBFA]">
          <div
            className="h-full rounded-[30px] bg-[#4F46E5]"
            style={{ width: `${enrollment.progress}%` }}
          ></div>
        </div>
      </div>
      {progress === 100 ? (
        <>
          <Button
            onClick={handleDelete}
            className="rounded-lg bg-[#4F46E5] text-[20px] font-medium text-[#FFFFFF] h-14.5 flex items-center justify-center gap-2.5"
          >
            Retake Course
            <img className="w-6 h-6" src={retake} alt="retake logo" />
          </Button>
          {isReviewsDisplayed ? (
            <div className="relative bg-[#FFFFFF] rounded-lg mt-9.75 h-43">
              <img
                className={`absolute right-2.5 top-2.5 w-[12.5px] h-[12.5px] cursor-pointer`}
                src={cross}
                alt="cross logo"
                onClick={() => setIsReviewsDisplayed(!isReviewsDisplayed)}
              />
              <ReviewSection
                courseId={courseId}
                reviews={reviews}
                isRated={isRated}
                onReviewSuccess={onReviewSuccess}
              />
            </div>
          ) : (
            <p
              className="text-[#4F46E5] text-[20px] font-semibold mx-auto mt-9.75 cursor-pointer hover:text-[#281ed2]"
              onClick={() => setIsReviewsDisplayed(!isReviewsDisplayed)}
            >
              Show reviews
            </p>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={handleComplete}
            className="rounded-lg bg-[#4F46E5] text-[20px] font-medium text-[#FFFFFF] h-14.5 flex items-center justify-center gap-2.5"
          >
            Complete Course
            <img className="w-6 h-6" src={thickTick} alt="tick" />
          </Button>
        </>
      )}
    </div>
  );
}
