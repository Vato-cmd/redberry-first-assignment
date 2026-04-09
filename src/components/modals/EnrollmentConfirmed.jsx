import { useModal } from "../../context/ModalContext";
import { useCourse } from "../../context/CourseContext";
import Modal from "../UI/Modal";

import circledBlueTick from "../../assets/circledBlueTick.svg";
import Button from "../UI/Button";

export default function EnrollmentConfirmed() {
  const { closeModal } = useModal();
  const { currentCourse } = useCourse();
  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-115">
      <div className="text-center flex flex-col items-center p-15">
        <img
          className="w-23.5 h-23.5 mb-6"
          src={circledBlueTick}
          alt="circled blue tick"
        />
        <h1 className="text-[#3D3D3D] text-[32px] font-semibold w-89 mb-6">
          Enrollment Confirmed!
        </h1>
        <p className="text-[#3D3D3D] text-[20px] font-medium w-89 mb-10">
          You've successfully enrolled to the “{currentCourse.title}” Course!
        </p>
        <div className=" flex gap-2">
          <Button
            className="rounded-lg border-2 bg-[#4F46E5] border-[#4F46E5] text-[#FFFFFF] text-[16px] font-medium w-43.5 h-14.5"
            onClick={closeModal}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
