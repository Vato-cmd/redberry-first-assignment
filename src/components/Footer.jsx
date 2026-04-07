import mainlogo from "../assets/logo.svg";
import facebook from "../assets/Facebook.png";
import instagram from "../assets/Instagram.png";
import linkedin from "../assets/LinkedIn.png";
import twitter from "../assets/Twitter.png";
import youtube from "../assets/YouTube.png";
import phone from "../assets/phone.png";
import location from "../assets/location.png";
import contact from "../assets/contact.png";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col mt-30 px-44.25 border-t border-[#C1BCBC80]">
      <div className="flex justify-between">
        <div className="flex flex-col mt-20">
          <div className="flex items-center gap-3 mb-4">
            <img src={mainlogo} alt="main logo" />
            <h2 className="text-[24px] text-[#130E67] font-medium">Bootcamp</h2>
          </div>
          <div className="w-77.5 mb-6">
            <p className="text-[14px] text-[#130E67] font-medium">
              Your learning journey starts here! Browse courses to get started.
            </p>
          </div>
          <div className="flex items-center justify-between w-44.25">
            <img src={facebook} alt="Facebook" />
            <img src={twitter} alt="Twitter" />
            <img src={instagram} alt="Instagram" />
            <img src={linkedin} alt="LinkedIn" />
            <img src={youtube} alt="YouTube" />
          </div>
        </div>

        <div className="flex justify-between gap-30 mt-20">
          <div className="text-[#666666] text-[18px] font-regular">
            <h2 className="text-[20px] font-semibold text-[#130E67] mb-4">
              Explore
            </h2>
            <p className="mb-2">Enrolled Courses</p>
            <p>Browse Courses</p>
          </div>
          <div className="text-[#666666] text-[18px] font-regular">
            <h2 className="text-[20px] font-semibold text-[#130E67] mb-4">
              Account
            </h2>
            <p>My Profile</p>
          </div>
          <div className="text-[#666666] text-[18px] font-regular">
            <h2 className="text-[20px] font-semibold text-[#130E67] mb-4">
              Contact
            </h2>
            <p className="flex items-center gap-1.5">
              <img src={contact} alt="contact email" />
              contact@company.com
            </p>
            <p className="flex items-center gap-1.5">
              <img src={phone} alt="phone number" />
              (+995) 555 111 222
            </p>
            <p className="flex items-center gap-1.5">
              <img src={location} alt="location" />
              Aghmashenebeli St.115
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-18.5 text-[#666666] text-[18px] font-regular">
        <p>Copyright © 2026 Redberry International</p>
        <p>
          All Rights Reserved |{" "}
          <span className="text-[#4F46E5]">Terms and Conditions</span> |{" "}
          <span className="text-[#4F46E5]">Privacy Policy</span>
        </p>
      </div>
    </footer>
  );
}
