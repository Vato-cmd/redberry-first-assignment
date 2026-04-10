import { useModal } from "../../context/ModalContext";
import Modal from "../UI/Modal";

import success from "../../assets/success.svg";

import ReviewSection from "../ReviewSection";
import Button from "../UI/Button";

export default function SuccessModal() {
  const { closeModal, modal } = useModal();
  const title = modal?.props?.title;
  const courseId = modal?.props?.courseId;

  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-115">
      <div className="text-center flex flex-col items-center justify-center p-15">
        <img className="w-23.5 h-23.5 mb-6" src={success} alt="success logo" />
        <h1 className="text-[#3D3D3D] text-[32px] font-semibold w-89 mb-6">
          Congratulations!
        </h1>
        <p className="text-[#3D3D3D] text-[20px] font-medium w-89">
          You've completed “<strong>{title}</strong>” Course!
        </p>
        <ReviewSection courseId={courseId} />

        <div className=" flexl gap-2">
          <Button
            className="rounded-lg border-2 bg-[#4F46E5] border-[#4F46E5] text-[#FFFFFF] text-[16px] font-medium w-43.5 h-14.5 mt-10"
            onClick={closeModal}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
