import {
  getWeeklySchedule,
  getTimeSlot,
  getSessionType,
} from "../api/schedule";
import { useEffect, useState } from "react";
import Button from "./UI/Button";

export default function Schedule({ courseId }) {
  const [weeklySchedules, setWeeklySchedules] = useState([]);
  const [selectedWeeklyScheduleId, setSelectedWeeklyScheduleId] =
    useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);

  const [sessionTypes, setSessionTypes] = useState([]);
  const [selectedSessionTypeId, setSelectedSessionTypeId] = useState(null);

  useEffect(() => {
    const loadSessionTypes = async () => {
      const getSessionTypes = await getSessionType(
        courseId,
        selectedWeeklyScheduleId,
        selectedTimeSlotId,
      );
      setSessionTypes(getSessionTypes);
    };
    if (courseId && selectedWeeklyScheduleId && selectedTimeSlotId) {
      loadSessionTypes();
    }
  }, [courseId, selectedWeeklyScheduleId, selectedTimeSlotId]);

  useEffect(() => {
    const loadTimeSlots = async () => {
      const getTimeSlots = await getTimeSlot(
        courseId,
        selectedWeeklyScheduleId,
      );
      setTimeSlots(getTimeSlots);
    };

    if (courseId && selectedWeeklyScheduleId) {
      loadTimeSlots();
    }
  }, [courseId, selectedWeeklyScheduleId]);

  useEffect(() => {
    const loadWeeklySchedule = async () => {
      const getSchedules = await getWeeklySchedule(courseId);
      setWeeklySchedules(getSchedules);
    };
    if (courseId) {
      loadWeeklySchedule();
    }
  }, [courseId]);
  return (
    <div>
      <h1>Weekly Schedule</h1>
      <div>
        {weeklySchedules.map((weekSchedule) => {
          return (
            <Button
              type="button"
              key={weekSchedule.id}
              onClick={() => {
                setSelectedWeeklyScheduleId(weekSchedule.id);
                setSelectedTimeSlotId(null);
                setTimeSlots([]);
              }}
            >
              {weekSchedule.label !== "Weekend Only"
                ? weekSchedule.label
                : "Weekend"}
            </Button>
          );
        })}
      </div>
      <h1>Time Slot</h1>

      <div>
        {timeSlots.map((timeSlot) => {
          return (
            <Button
              key={timeSlot.id}
              type="button"
              onClick={() => {
                setSelectedTimeSlotId(timeSlot.id);
                setSelectedSessionTypeId(null);
                setSessionTypes([]);
              }}
            >
              {timeSlot.label}
            </Button>
          );
        })}
      </div>

      <h1>Session Types</h1>

      <div>
        {sessionTypes.map((sessionType) => {
          return (
            <Button
              key={sessionType.id}
              type="button"
              onClick={() => {
                setSelectedSessionTypeId(sessionType.id);
              }}
            >
              {sessionType.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
