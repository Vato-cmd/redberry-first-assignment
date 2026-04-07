import { useEffect, useState } from "react";
import {
  getWeeklySchedule,
  getTimeSlot,
  getSessionType,
} from "../api/schedule";

export function useCourseSchedule(courseId) {
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
  function handleWeeklyScheduleSelect(id) {
    setSelectedWeeklyScheduleId(id);
    setSelectedTimeSlotId(null);
    setSelectedSessionTypeId(null);
    setTimeSlots([]);
    setSessionTypes([]);
  }

  function handleTimeSlotSelect(id) {
    setSelectedTimeSlotId(id);
    setSelectedSessionTypeId(null);
    setSessionTypes([]);
  }

  function handleSessionTypeSelect(id) {
    setSelectedSessionTypeId(id);
  }

  return {
    weeklySchedules,
    selectedWeeklyScheduleId,
    timeSlots,
    selectedTimeSlotId,
    sessionTypes,
    selectedSessionTypeId,
    handleWeeklyScheduleSelect,
    handleTimeSlotSelect,
    handleSessionTypeSelect,
  };
}
