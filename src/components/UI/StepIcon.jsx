export default function StepIcon({ number, active }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border w-7 h-7 
        ${
          active
            ? "bg-[#ffff] text-[#0A0836] border-[#0A0836]"
            : "text-[#8A8A8A] border-[#8A8A8A] bg-[#ffff]"
        }`}
    >
      {number}
    </div>
  );
}
