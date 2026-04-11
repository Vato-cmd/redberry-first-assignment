import Button from "./UI/Button";

import clock from "../assets/clock.svg";
import calendar from "../assets/calendar.svg";
import monitor from "../assets/monitor.svg";
import location from "../assets/location.svg";
import hibryd from "../assets/hibryd.svg";
import inperson from "../assets/inperson.svg";
import thickTick from "../assets/thick-tick.svg";
import retake from "../assets/retake.svg";
import cross from "../assets/cross.svg";

import { useModal } from "../context/ModalContext";
import StarRating from "./UI/StarRating";

import ReviewSection from "./ReviewSection";

import {
  formatSessionTypeName,
  formatTimeSlotLabel,
} from "../utils/scheduleHelpers";
import { useEnroll } from "../context/EnrollContext";

export default function EnrolledCourseCard({
  enrollment,
  onEnrollSuccess,
  onEnrollDelete,
  course,
  courseId,
}) {
  const { timeRange } = formatTimeSlotLabel(enrollment.schedule.timeSlot.label);
  const { completeCourse, deleteCourse } = useEnroll();
  const { openModal } = useModal();
  const progress = enrollment.progress;
  console.log(courseId);

  async function handleComplete() {
    try {
      await completeCourse(enrollment.id);
      await onEnrollSuccess?.();
      openModal("success", {
        title: course.title,
        courseId: courseId,
      });
    } catch (error) {}
  }

  async function handleDelete() {
    try {
      await deleteCourse(enrollment.id);
      await onEnrollDelete?.();
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
          <img src={calendar} alt="calendar" />
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
          <div className="relative bg-[#FFFFFF] rounded-lg mt-9.75 h-43">
            <img
              className="absolute right-2.5 top-2.5 w-[12.5px] h-[12.5px]"
              src={cross}
              alt="cross logo"
            />
            <ReviewSection courseId={courseId} />
          </div>
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
