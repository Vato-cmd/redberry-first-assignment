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
  DEFAULT_SESSION_TYPES,
} from "../utils/scheduleConfig";
import {
  getTimeSlotKey,
  getWeeklyScheduleKey,
  getSessionTypeKey,
} from "../utils/scheduleHelpers";
import {
  CloudSun,
  Sun,
  Moon,
  Monitor,
  Users,
  Blend,
  MapPin,
  TriangleAlert,
} from "lucide-react";

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
    openSection,
    setOpenSection,
    toggleSection,
  } = useCourseSchedule(courseId);
  return (
    <div>
      {error && <p className="text-[#F4161A] mb-4">{error}</p>}

      <ScheduleSection
        title="Weekly Schedule"
        loadingText="Loading weekly schedules"
        isLoading={isLoadingWeeklySchedules}
        className="flex gap-3"
        isOpen={openSection.weekly}
        isDisabled={false}
        onToggle={() => toggleSection("weekly")}
        step={1}
        isCompleted={!openSection.weekly && selectedWeeklyScheduleId}
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
              slotType="week"
              className={`text-[16px] border rounded-xl bg-[#FFFFFF] h-22.75 w-[123.5px] font-semibold ${!isDisabled ? "hover:bg-[#dddbfa] hover:text-[#4F46E5] hover:border-[#958FEF]" : ""}`}
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
        className="flex justify-between gap-2"
        isOpen={openSection.time}
        isDisabled={!selectedWeeklyScheduleId}
        onToggle={() => toggleSection("time")}
        step={2}
        isCompleted={!openSection.time && selectedTimeSlotId}
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
              className={`text-[14px] font-medium border rounded-xl w-40.75 h-15.25 text-start ${!isDisabled ? "hover:bg-[#dddbfa] hover:text-[#4F46E5] hover:border-[#958FEF]" : ""}`}
              onClick={() =>
                matchedTimeSlot && handleTimeSlotSelect(matchedTimeSlot.id)
              }
            >
              {matchedTimeSlot ? (
                <div className="flex items-center justify-center gap-3">
                  {defaultSlot.label === "Morning" ? (
                    <CloudSun className="h-6.5 w-6.5" />
                  ) : defaultSlot.label === "Afternoon" ? (
                    <Sun className="h-6.5 w-6.5" />
                  ) : (
                    <Moon className="h-6.5 w-6.5" />
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
                    <Sun className="h-6.5 w-6.5" />
                  ) : (
                    <Moon className="h-6.5 w-6.5" />
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
        className="flex justify-between gap-2"
        isOpen={openSection.session}
        isDisabled={!selectedTimeSlotId}
        onToggle={() => toggleSection("session")}
        step={3}
        isCompleted={!openSection.session && selectedSessionTypeId}
      >
        {DEFAULT_SESSION_TYPES.map((defaultSessionType) => {
          const matchedSessionType = sessionTypes.find(
            (type) => getSessionTypeKey(type.name) === defaultSessionType.key,
          );

          const isDisabled =
            !matchedSessionType || matchedSessionType.availableSeats === 0;

          return (
            <div
              className="flex flex-col items-center"
              key={defaultSessionType.key}
            >
              <ScheduleOption
                isSelected={selectedSessionTypeId === matchedSessionType?.id}
                onClick={() =>
                  matchedSessionType &&
                  handleSessionTypeSelect(matchedSessionType?.id)
                }
                disabled={isDisabled}
                className={`w-40.75 h-32.75 rounded-xl py-3.75 px-5 border ${!isDisabled ? "hover:bg-[#dddbfa] hover:text-[#4F46E5] hover:border-[#958FEF]" : ""}`}
              >
                {matchedSessionType ? (
                  <div className="flex flex-col items-center justify-center">
                    {matchedSessionType.name === "online" ? (
                      <Monitor className="h-6.5 w-6.5" />
                    ) : matchedSessionType.name === "in_person" ? (
                      <Users className="h-6.5 w-6.5" />
                    ) : (
                      <Blend className="h-6.5 w-6.5" />
                    )}
                    <p className="font-semibold text-[16px]">
                      {formatSessionTypeName(matchedSessionType.name)}
                    </p>
                    {matchedSessionType.location ? (
                      <p className="text-[12px] font-regular flex items-center">
                        <MapPin className="w-3 h-3 mr-0.5" />
                        {matchedSessionType.location}
                      </p>
                    ) : (
                      <p className="text-[12px] font-regular">Google Meet</p>
                    )}
                    {matchedSessionType.name === "in_person" ? (
                      <p
                        className={`text-[14px] font-medium ${isDisabled ? "text-[]" : "text-[#736BEA]"}`}
                      >
                        + 30$
                      </p>
                    ) : matchedSessionType.name === "online" ? (
                      <p
                        className={`text-[14px] font-medium ${isDisabled ? "text-[]" : "text-[#736BEA]"}`}
                      >
                        Included
                      </p>
                    ) : (
                      <p
                        className={`text-[14px] font-medium ${isDisabled ? "text-[]" : "text-[#736BEA]"}`}
                      >
                        + 50$
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    {defaultSessionType.label === "Online" ? (
                      <Monitor className="h-6.5 w-6.5" />
                    ) : defaultSessionType.label === "In-Person" ? (
                      <Users className="h-6.5 w-6.5" />
                    ) : (
                      <Blend className="h-6.5 w-6.5" />
                    )}
                    <p className="font-semibold text-[16px]">
                      {defaultSessionType.label}
                    </p>
                    <p className="text-[10px] font-regular flex items-center gap-0.5">
                      {defaultSessionType.label !== "Online" && (
                        <MapPin className="w-3 h-3 mr-0.5" />
                      )}
                      {defaultSessionType.label === "Online"
                        ? "Google Meet"
                        : "Chavchavadze St.34"}
                    </p>
                    <p className="text-[14px] font-medium">
                      {defaultSessionType.label === "Online"
                        ? "Included"
                        : defaultSessionType.label === "In-Person"
                          ? "+30$"
                          : "+50$"}
                    </p>
                  </div>
                )}
              </ScheduleOption>
              <p
                className={`text-[12px] font-medium ${matchedSessionType && matchedSessionType.availableSeats < 5 && !isDisabled ? "text-[#F4A316]" : "text-[#3D3D3D]"} mt-2 flex gap-1`}
              >
                {matchedSessionType &&
                  matchedSessionType.availableSeats < 5 &&
                  !isDisabled && <TriangleAlert className="w-4 h-4" />}
                {matchedSessionType
                  ? `${matchedSessionType.availableSeats && !isDisabled ? matchedSessionType.availableSeats + " Seats Available" : "Fully Booked"}`
                  : "No Seats Available"}
              </p>
            </div>
          );
        })}
      </ScheduleSection>
    </div>
  );
}
