import Button from "./UI/Button";

export default function Sumamry({ basePrice, sessionExtra, totalPrice }) {
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
        className="bg-[#4f46e5] text-[#ffff] text-[20px] cursor-pointer rounded-xl p-2.5 h-15.75 hover:bg-[#281ED2] duration-300 ease-in-out"
      >
        Enroll Now
      </Button>
    </section>
  );
}
