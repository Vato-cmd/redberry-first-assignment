import {
  formatTimeSlotLabel,
  formatSessionTypeName,
  formatWeekdayLabel,
} from "../utils/scheduleHelpers";
import ScheduleSection from "./ScheduleSection";
import ScheduleOption from "./ScheduleOption";
import { useCourseSchedule } from "../hooks/useCourseSchedule";
import {
  DEFAULT_TIME_SLOTS,
  DEFAULT_WEEKLY_SCHEDULES,
} from "../utils/scheduleConfig";
import { getTimeSlotKey, getWeeklyScheduleKey } from "../utils/scheduleHelpers";
import { CloudSun, Sun, Moon } from "lucide-react";

export default function Schedule({ courseId }) {
  const {
    weeklySchedules,
    selectedWeeklyScheduleId,
    timeSlots,
    selectedTimeSlotId,
    sessionTypes,
    selectedSessionTypeId,
    isLoadingWeeklySchedules,
    isLoadingTimeSlots,
    isLoadingSessionTypes,
    error,
    handleWeeklyScheduleSelect,
    handleTimeSlotSelect,
    handleSessionTypeSelect,
  } = useCourseSchedule(courseId);

  return (
    <div>
      {error && <p className="text-[#F4161A] mb-4">{error}</p>}

      <ScheduleSection
        title="Weekly Schedule"
        loadingText="Loading weekly schedules"
        isLoading={isLoadingWeeklySchedules}
      >
        {DEFAULT_WEEKLY_SCHEDULES.map((defaultSchedule) => {
          const matchedWeeklySchedule = weeklySchedules.find(
            (schedule) =>
              getWeeklyScheduleKey(schedule.label) === defaultSchedule.key,
          );

          const isDisabled = !matchedWeeklySchedule;

          return (
            <ScheduleOption
              key={defaultSchedule.key}
              isSelected={
                selectedWeeklyScheduleId === matchedWeeklySchedule?.id
              }
              disabled={isDisabled}
              onClick={() =>
                matchedWeeklySchedule &&
                handleWeeklyScheduleSelect(matchedWeeklySchedule.id)
              }
            >
              {matchedWeeklySchedule ? (
                <div>{formatWeekdayLabel(matchedWeeklySchedule.label)}</div>
              ) : (
                <div>{defaultSchedule.label}</div>
              )}
            </ScheduleOption>
          );
        })}
      </ScheduleSection>

      <ScheduleSection
        title="Time Slot"
        loadingText="Loading time slots"
        isLoading={isLoadingTimeSlots}
        className="flex gap-2.5"
      >
        {DEFAULT_TIME_SLOTS.map((defaultSlot) => {
          const matchedTimeSlot = timeSlots.find(
            (slot) => getTimeSlotKey(slot.label) === defaultSlot.key,
          );

          const isDisabled = !matchedTimeSlot;
          return (
            <ScheduleOption
              key={defaultSlot.key}
              isSelected={selectedTimeSlotId === matchedTimeSlot?.id}
              disabled={isDisabled}
              className={`text-[14px] font-medium border rounded-xl w-40.75 h-15.25 text-start ${!isDisabled ? "hover:bg-[#dddbfa] hover:text-[#4F46E5] hover:border-[958FEF]" : ""}`}
              onClick={() =>
                matchedTimeSlot && handleTimeSlotSelect(matchedTimeSlot.id)
              }
            >
              {matchedTimeSlot ? (
                <div className="flex items-center justify-center gap-3">
                  {defaultSlot.label === "Morning" ? (
                    <CloudSun className="h-6.5 w-6.5" />
                  ) : defaultSlot.label === "Afternoon" ? (
                    <Sun />
                  ) : (
                    <Moon />
                  )}
                  <div>
                    <p>{formatTimeSlotLabel(matchedTimeSlot.label).period}</p>
                    <p className="text-[10px] font-regular">
                      {formatTimeSlotLabel(matchedTimeSlot.label).timeRange}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 justify-center">
                  {defaultSlot.label === "Morning" ? (
                    <CloudSun className="h-6.5 w-6.5" />
                  ) : defaultSlot.label === "Afternoon" ? (
                    <Sun />
                  ) : (
                    <Moon />
                  )}
                  <div>
                    <p>{defaultSlot.label}</p>
                    <p className="text-[10px] font-regular">
                      {defaultSlot.label === "Morning"
                        ? "9:00 AM - 12:00 PM"
                        : defaultSlot.label === "Afternoon"
                          ? "12:00 PM - 6:00 PM"
                          : "6:00 PM - 9:00 PM"}
                    </p>
                  </div>
                </div>
              )}
            </ScheduleOption>
          );
        })}
      </ScheduleSection>

      <ScheduleSection
        title="Session Types"
        loadingText="Loading session types"
        isLoading={isLoadingSessionTypes}
      >
        {sessionTypes.map((sessionType) => {
          return (
            <ScheduleOption
              key={sessionType.id}
              isSelected={selectedSessionTypeId === sessionType.id}
              onClick={() => handleSessionTypeSelect(sessionType.id)}
            >
              {formatSessionTypeName(sessionType.name)}
            </ScheduleOption>
          );
        })}
      </ScheduleSection>
    </div>
  );
}
