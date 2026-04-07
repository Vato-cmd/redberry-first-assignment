import {
  getOptionClasses,
  formatTimeSlotLabel,
  formatSessionTypeName,
  formatWeekdayLabel,
} from "../utils/scheduleHelpers";
import Button from "./UI/Button";
import ScheduleSection from "./ScheduleSection";

import { useCourseSchedule } from "../hooks/useCourseSchedule";

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
        {weeklySchedules.map((weekSchedule) => {
          return (
            <Button
              type="button"
              key={weekSchedule.id}
              onClick={() => handleWeeklyScheduleSelect(weekSchedule.id)}
              className={getOptionClasses(
                selectedWeeklyScheduleId === weekSchedule.id,
              )}
            >
              <div>{formatWeekdayLabel(weekSchedule.label)}</div>
            </Button>
          );
        })}
      </ScheduleSection>

      <ScheduleSection
        title="Time Slot"
        loadingText="Loading time slots"
        isLoading={isLoadingTimeSlots}
      >
        {timeSlots.map((timeSlot) => {
          const { period, timeRange } = formatTimeSlotLabel(timeSlot.label);
          return (
            <Button
              key={timeSlot.id}
              type="button"
              onClick={() => handleTimeSlotSelect(timeSlot.id)}
              className={getOptionClasses(selectedTimeSlotId === timeSlot.id)}
            >
              <span>{period}</span>
              <p>{timeRange}</p>
            </Button>
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
            <Button
              key={sessionType.id}
              type="button"
              onClick={() => handleSessionTypeSelect(sessionType.id)}
              className={getOptionClasses(
                selectedSessionTypeId === sessionType.id,
              )}
            >
              {formatSessionTypeName(sessionType.name)}
            </Button>
          );
        })}
      </ScheduleSection>
    </div>
  );
}
