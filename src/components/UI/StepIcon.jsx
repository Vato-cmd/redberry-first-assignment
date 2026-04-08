export default function StepIcon({ number, active, completed }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-[1.5px] w-7 h-7 
        ${
          completed
            ? "bg-[#0A0836] text-[#ffff] border-[#0A0836]"
            : active
              ? "bg-[#ffff] text-[#0A0836] border-[#0A0836]"
              : "text-[#8A8A8A] border-[#8A8A8A] bg-[#ffff]"
        }`}
    >
      <p className="font-medium">{number}</p>
    </div>
  );
}
