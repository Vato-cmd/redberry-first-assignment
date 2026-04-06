import mainlogo from "../assets/logo.svg";
import navicon from "../assets/Nav-icon.png";
import Button from "./UI/Button.jsx";
import userLogo from "../assets/User.svg";
import bookIcon from "../assets/book.svg";
import { Sparkles, BookOpen } from "lucide-react";
import profileOrange from "../assets/profile-orange.svg";
import profileGreen from "../assets/profile-green.svg";

import { useModal } from "../context/ModalContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  const { openModal } = useModal();
  const { isAuthorized, user, isProfileComplete } = useAuth();

  return (
    <header className="w-full h-27 border-b border-[#D1D1D1] py-6 px-44.25">
      <nav className="flex items-center justify-between text-[20px] font-medium">
        <Link to="/">
          <img
            className="cursor-pointer h-15 w-15"
            src={mainlogo}
            alt="main logo"
          />
        </Link>

        <div className="flex items-center">
          <Link
            to="/courses"
            className="flex gap-2 text-[#525252] mr-9 cursor-pointer hover:text-[#4F46E5]"
          >
            <Sparkles className="h-6.5 w-6.5" alt="browse courses" />
            Browse Courses
          </Link>

          <div className="flex gap-3.75">
            {!isAuthorized ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  to=""
                  className="flex items-center gap-2 mr-9 text-[#525252] cursor-pointer hover:text-[#4F46E5]"
                >
                  <BookOpen className="w-6.5 h-6.5 " alt="book logo" />
                  <p className="text-[20px]">Enrolled Courses</p>
                </Link>
                <div
                  onClick={() => openModal("profile")}
                  className="relative bg-[#EEEDFC] w-14 h-14 flex items-center justify-center rounded-full cursor-pointer border-2 border-transparent hover:border-[#b7b3f4]"
                >
                  <img src={userLogo} alt="user logo" />
                  <img
                    className="absolute top-9.75 left-9.75"
                    src={isProfileComplete ? profileGreen : profileOrange}
                    alt="profile indicator"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
