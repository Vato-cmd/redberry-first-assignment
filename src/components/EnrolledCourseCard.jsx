import Button from "./UI/Button";

import clock from "../assets/clock.svg";
import calendar from "../assets/calendar.svg";
import monitor from "../assets/monitor.svg";
import location from "../assets/location.svg";
import hibryd from "../assets/hibryd.svg";
import inperson from "../assets/inperson.svg";
import thickTick from "../assets/thick-tick.svg";

export default function EnrolledCourseCard({ enrollment }) {
  return (
    <div className="text-[#525252] text-[20px] font-medium w-118.25 flex flex-col py-4.25 px-6.25">
      <div className="flex flex-col gap-5.5 mb-12">
        <p className="flex items-center gap-3">
          <img src={calendar} alt="calendar" />
          {enrollment.schedule.weeklySchedule.label}
        </p>
        <p className="flex items-center gap-3">
          <img src={clock} alt="clock" />
          {enrollment.schedule.timeSlot.label}
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
          {enrollment.schedule.sessionType.name}
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
      <Button className="rounded-lg bg-[#4F46E5] text-[20px] font-medium text-[#FFFFFF] h-14.5 flex items-center justify-center gap-2.5 ">
        Complete Course
        <img className="w-6 h-6" src={thickTick} alt="tick" />
      </Button>
    </div>
  );
}
