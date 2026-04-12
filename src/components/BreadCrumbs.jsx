import rightArrow from "../assets/rightArrow.svg";

export default function BreadCrumbs({ items = [], className }) {
  return (
    <div className={`flex items-center mb-8.25 ${className}`}>
      {items.map((item, index) => {
        return (
          <div className="flex items-center" key={`${item}-${index}`}>
            {index !== 0 && (
              <img
                className="w-[7.13px] h-[12.97px] mr-1.5 ml-1"
                src={rightArrow}
                alt="right arrow"
              />
            )}
            <span
              className={`${index === items.length - 1 ? "text-[#4F46E5]" : "text-[#666666]"} text-[18px] font-medium `}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}
