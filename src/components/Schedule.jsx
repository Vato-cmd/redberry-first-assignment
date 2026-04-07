import {
  getOptionClasses,
  formatTimeSlotLabel,
  formatSessionTypeName,
  formatWeekdayLabel,
} from "../utils/scheduleHelpers";
import Button from "./UI/Button";
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
      <h1>Weekly Schedule</h1>
      <div>
        {isLoadingWeeklySchedules ? (
          <p>Loading weekly schedules</p>
        ) : (
          weeklySchedules.map((weekSchedule) => {
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
          })
        )}
      </div>

      <h1>Time Slot</h1>

      <div>
        {isLoadingTimeSlots ? (
          <p>Loading time slots</p>
        ) : (
          timeSlots.map((timeSlot) => {
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
          })
        )}
      </div>

      <h1>Session Types</h1>

      <div>
        {isLoadingSessionTypes ? (
          <p>Loading time slots</p>
        ) : (
          sessionTypes.map((sessionType) => {
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
          })
        )}
      </div>
    </div>
  );
}
