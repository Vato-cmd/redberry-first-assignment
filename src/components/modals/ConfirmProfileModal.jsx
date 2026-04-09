import { useModal } from "../../context/ModalContext";
import Modal from "../UI/Modal";

import singleUserIcon from "../../assets/single-user-icon.svg";
import Button from "../UI/Button";

export default function ConfirmProfileModal() {
  const { closeModal, openModal } = useModal();
  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-115">
      <div className="text-center flex flex-col items-center p-15">
        <img
          className="w-23.5 h-23.5 mb-6"
          src={singleUserIcon}
          alt="single user icon"
        />
        <h1 className="text-[#3D3D3D] text-[32px] font-semibold w-89 mb-6">
          Complete your profile to continue
        </h1>
        <p className="text-[#3D3D3D] text-[20px] font-medium w-89 mb-10">
          You need to complete your profile before enrolling in this course.
        </p>
        <div className=" flex gap-2">
          <Button
            className=" rounded-lg border-2 border-[#958FEF] text-[#4F46E5] text-[16px] font-medium w-43.5 h-14.5"
            onClick={() => openModal("profile")}
          >
            Complete Profile
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
