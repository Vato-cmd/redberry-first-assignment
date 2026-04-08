import { useEffect, useState } from "react";
import {
  getWeeklySchedule,
  getTimeSlot,
  getSessionType,
} from "../api/schedule";

export function useCourseSchedule(courseId) {
  const [weeklySchedules, setWeeklySchedules] = useState([]);
  const [timeSlotsByWeekId, setTimeSlotsByWeekId] = useState({});
  const [sessionTypesByKey, setSessionTypesByKey] = useState({});
  const [selectedWeeklyScheduleId, setSelectedWeeklyScheduleId] =
    useState(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [selectedSessionTypeId, setSelectedSessionTypeId] = useState(null);

  const [isLoadingWeeklySchedules, setIsLoadingWeeklySchedules] =
    useState(false);
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
  const [isLoadingSessionTypes, setIsLoadingSessionTypes] = useState(false);

  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState({
    weekly: true,
    time: false,
    session: false,
  });

  const timeSlots = timeSlotsByWeekId[selectedWeeklyScheduleId] || [];
  const sessionKey = `${selectedWeeklyScheduleId}-${selectedTimeSlotId}`;
  const sessionTypes = sessionTypesByKey[sessionKey] || [];

  function toggleSection(sectionName) {
    setOpenSection((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }

  useEffect(() => {
    if (
      selectedWeeklyScheduleId &&
      !isLoadingTimeSlots &&
      timeSlots.length > 0
    ) {
      setOpenSection((prev) => ({
        ...prev,
        time: true,
      }));
    }
  }, [selectedWeeklyScheduleId, isLoadingTimeSlots, timeSlots.length]);

  useEffect(() => {
    if (
      selectedTimeSlotId &&
      !isLoadingSessionTypes &&
      sessionTypes.length > 0
    ) {
      setOpenSection((prev) => ({
        ...prev,
        session: true,
      }));
    }
  }, [selectedTimeSlotId, isLoadingSessionTypes, sessionTypes.length]);

  useEffect(() => {
    async function loadWeeklySchedules() {
      try {
        setIsLoadingWeeklySchedules(true);
        setError("");

        const schedulesData = await getWeeklySchedule(courseId);
        setWeeklySchedules(schedulesData);
      } catch (error) {
        setError(error.message || "Failed to fetch weekly schedules");
      } finally {
        setIsLoadingWeeklySchedules(false);
      }
    }

    if (courseId) {
      loadWeeklySchedules();
    }
  }, [courseId]);

  async function handleWeeklyScheduleSelect(id) {
    setSelectedWeeklyScheduleId(id);
    setSelectedTimeSlotId(null);
    setSelectedSessionTypeId(null);
    setError("");

    if (timeSlotsByWeekId[id]) return;

    try {
      setIsLoadingTimeSlots(true);
      const timeSlotsData = await getTimeSlot(courseId, id);

      setTimeSlotsByWeekId((prev) => ({
        ...prev,
        [id]: timeSlotsData,
      }));
    } catch (error) {
      setError(error.message || "Failed to fetch time slots");
    } finally {
      setIsLoadingTimeSlots(false);
    }
  }

  async function handleTimeSlotSelect(id) {
    setSelectedTimeSlotId(id);
    setSelectedSessionTypeId(null);
    setError("");

    const key = `${selectedWeeklyScheduleId}-${id}`;

    if (sessionTypesByKey[key]) return;

    try {
      setIsLoadingSessionTypes(true);
      const sessionTypesData = await getSessionType(
        courseId,
        selectedWeeklyScheduleId,
        id,
      );

      setSessionTypesByKey((prev) => ({
        ...prev,
        [key]: sessionTypesData,
      }));
    } catch (error) {
      setError(error.message || "Failed to fetch session types");
    } finally {
      setIsLoadingSessionTypes(false);
    }
  }

  function handleSessionTypeSelect(id) {
    setSelectedSessionTypeId(id);
  }

  return {
    weeklySchedules,
    timeSlots,
    sessionTypes,
    selectedWeeklyScheduleId,
    selectedTimeSlotId,
    selectedSessionTypeId,
    isLoadingWeeklySchedules,
    isLoadingTimeSlots,
    isLoadingSessionTypes,
    error,
    handleWeeklyScheduleSelect,
    handleTimeSlotSelect,
    handleSessionTypeSelect,
    openSection,
    setOpenSection,
    toggleSection,
  };
}
