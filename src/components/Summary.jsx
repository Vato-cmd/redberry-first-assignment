import Button from "./UI/Button";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";

export default function Summary({
  basePrice,
  sessionExtra,
  totalPrice,
  isDisabled,
}) {
  const { openModal } = useModal();
  const { isAuthorized, isProfileComplete } = useAuth();

  function handleEnrollClick() {
    if (!isProfileComplete) {
      openModal("confirm");
    }
  }
  return (
    <section className="flex flex-col p-10 bg-[#FFFFFF] rounded-xl border border-[#F5F5F5]">
      <div className="flex justify-between mb-8 text-[#8A8A8A] font-semibold">
        <h2 className="text-[20px]">Total Price</h2>
        <p className="text-[32px] text-[#292929]">${totalPrice}</p>
      </div>
      <div className="flex justify-between mb-3 text-[#8A8A8A] text-[16px] font-medium">
        <p>Base Price</p>
        <p className="text-[#292929]">+ ${basePrice}</p>
      </div>
      <div className="flex justify-between mb-8 text-[#8A8A8A] text-[16px] font-medium">
        <p>Session Type</p>
        <p className="text-[#292929]">+ ${sessionExtra}</p>
      </div>
      <Button
        type="button"
        className={` 
          cursor-pointer rounded-xl p-2.5 h-15.75 text-[20px] font-semibold  
          ${isDisabled ? "bg-[#EEEDFC] text-[#B7B3F4]" : "bg-[#4f46e5] text-[#ffff]  hover:bg-[#281ED2] duration-300 ease-in-out"}
          `}
        disabled={isDisabled}
        onClick={handleEnrollClick}
      >
        Enroll Now
      </Button>
    </section>
  );
}
