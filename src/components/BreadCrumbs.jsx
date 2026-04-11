import rightArrow from "./UI/rightArrow.svg";

export default function BreadCrumbs({ items = [] }) {
  return (
    <div>
      {items.map((item, index) => {
        <div key={`${item}-${index}`}>
          {index !== 0 && (
            <img className="w-4 h-4" src={rightArrow} alt="right arrow" />
          )}
          <span
            className={`${index === item.length - 1 ? "text-red-500" : "text-gray-500"}`}
          >
            {item}
          </span>
        </div>;
      })}
    </div>
  );
}
