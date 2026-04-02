import mainlogo from "../assets/mainlogo.png";
import navicon from "../assets/Nav-icon.png";
import Button from "./UI/Button.jsx";

export default function Header() {
  return (
    <header className="w-full h-[108px] border-b-[1px] border-[#D1D1D1] py-[24px] px-[177px]">
      <nav className="flex items-center justify-between text-[20px] font-medium">
        <img className="h-[60px] w-[60px]" src={mainlogo} alt="main logo" />
        <div className="flex items-center">
          <p className="flex gap-[8px] text-[#525252] mr-9">
            <img className="h-[26px] w-[26px]" src={navicon} alt="main logo" />
            Browse Courses
          </p>
          <div className="flex gap-[15px]">
            <Button className="border-[2px] border-[#958FEF] text-[#4F46E5] h-[60px] w-[114px] py-[12px] px-[16px] rounded-[8px]">
              Log In
            </Button>
            <Button className="bg-[#4F46E5] text-white h-[60px] w-[114px] py-[12px] px-[16px] rounded-[8px]">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
