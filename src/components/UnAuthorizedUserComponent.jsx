import { TriangleAlert } from "lucide-react";
import Button from "./UI/Button";
import ArrowToRight from "../assets/arrowToRight.svg";
import { useModal } from "../context/ModalContext";

export default function UnAuthorizedUserComponent() {
  const { openModal } = useModal();
  return (
    <div className="flex items-center justify-between bg-[#F8FAFC] mt-3 rounded-xl p-5 h-25.5">
      <div>
        <div className="flex gap-1.5 text-[#292929] text-[16px] font-medium mb-2">
          <TriangleAlert className="w-5.5 h-5.5 text-[#F4A316]" />
          <h2>Authentication Required</h2>
        </div>
        <p className="text-[#8A8A8A] text-[12px] font-normal w-[283.06px]">
          You need sign in to your profile before enrolling in this course.
        </p>
      </div>
      <Button
        className="rounded-lg w-22.75 h-11.5 bg-[#EEEDFC] border border-[#B7B3F4] text-[#281ED2] cursor-pointer flex items-center justify-center gap-1.5"
        onClick={() => openModal("login")}
      >
        Sign In
        <img src={ArrowToRight} alt="arrow right" />
      </Button>
    </div>
  );
}
