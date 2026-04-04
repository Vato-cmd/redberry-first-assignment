import mainlogo from "../assets/mainlogo.png";
import navicon from "../assets/Nav-icon.png";
import Button from "./UI/Button.jsx";
import { useModal } from "../context/ModalContext.jsx";

export default function Header() {
  const { openModal } = useModal();

  return (
    <header className="w-full h-27 border-b border-[#D1D1D1] py-6 px-44.25">
      <nav className="flex items-center justify-between text-[20px] font-medium">
        <img
          className="cursor-pointer h-15 w-15"
          src={mainlogo}
          alt="main logo"
        />

        <div className="flex items-center">
          <p className="flex gap-2 text-[#525252] mr-9 cursor-pointer">
            <img className="h-6.5 w-6.5" src={navicon} alt="browse courses" />
            Browse Courses
          </p>

          <div className="flex gap-3.75">
            <Button
              className="border-2 border-[#958FEF] text-[#4F46E5] h-15 w-28.5 py-3 px-4 rounded-lg"
              onClick={() => openModal("login")}
            >
              Log In
            </Button>

            <Button
              className="bg-[#4F46E5] text-white h-15 w-28.5 py-3 px-4 rounded-lg"
              onClick={() => openModal("signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
