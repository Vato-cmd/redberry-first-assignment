import { useModal } from "../../context/ModalContext";
import Modal from "../UI/Modal";
import { useEnroll } from "../../context/EnrollContext";
import conflict from "../../assets/conflict.svg";
import Button from "../UI/Button";
import {
  formatWeekdayLabel,
  formatTimeSlotLabel,
} from "../../utils/scheduleHelpers";

export default function ConflictModal() {
  const { closeModal, modal, openModal } = useModal();
  const { enroll } = useEnroll();

  const courseId = modal?.props?.courseId;
  const courseScheduleId = modal?.props?.courseScheduleId;
  const onEnrollSuccess = modal?.props?.onEnrollSuccess;
  const conflicts = modal?.props?.conflicts || [];
  const firstConflict = conflicts[0];

  async function handleForceEnroll() {
    try {
      await enroll(courseId, courseScheduleId, true);
      await onEnrollSuccess?.();
      closeModal();
      openModal("enroll-confirmed");
    } catch (error) {}
  }

  const { timeRange } = formatTimeSlotLabel(
    firstConflict?.schedule.split(" at ")[1],
  );
  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-115">
      <div className="text-center flex flex-col items-center p-15">
        <img
          className="w-23.5 h-23.5 mb-6"
          src={conflict}
          alt="circled blue tick"
        />
        <h1 className="text-[#3D3D3D] text-[32px] font-semibold w-89 mb-6">
          Enrollment Conflict
        </h1>
        <p className="text-[#3D3D3D] text-[20px] font-medium w-89 mb-10">
          You are already enrolled in “{firstConflict?.conflictingCourseName}”
          with the same schedule:{" "}
          {formatWeekdayLabel(firstConflict?.schedule.split(" at ")[0])} at{" "}
          {timeRange}
        </p>
        <div className=" flex gap-2">
          <Button
            className=" rounded-lg border-2 border-[#958FEF] text-[#4F46E5] text-[16px] font-medium w-43.5 h-14.5"
            onClick={handleForceEnroll}
          >
            Continue Anyway
          </Button>
          <Button
            className="rounded-lg border-2 bg-[#4F46E5] border-[#4F46E5] text-[#FFFFFF] text-[16px] font-medium w-43.5 h-14.5"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
