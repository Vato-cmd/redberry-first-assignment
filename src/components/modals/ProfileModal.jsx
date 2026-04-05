import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { authenticatedUser } from "../../api/auth";
import profileOrange from "../../assets/profile-orange.svg";
import profileGreen from "../../assets/profile-green.svg";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function ProfileModal() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { closeModal } = useModal();
  const { token, isProfileComplete } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);
        const data = await authenticatedUser(token);
        setUserProfile(data.data);
      } catch (error) {
        setError(error.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }
    if (token) {
      loadProfile();
    }
  }, [token]);

  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-115">
      {isLoading ? (
        <div>User credentials...</div>
      ) : error ? (
        <div className="text-[#F4161A]">{error}</div>
      ) : (
        <div className="w-90 mx-auto flex flex-col gap-6">
          <h1 className="text-[32px] font-semibold text-[#141414] text-center">
            Profile
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                className="rounded-full w-14 h-14"
                src={userProfile.avatar}
                alt="user image"
              />
              <img
                className="absolute top-10.25 left-10.25"
                src={isProfileComplete ? profileGreen : profileOrange}
                alt="profile indicator"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-semibold text-[#0A0A0A]">
                {userProfile.username}
              </h2>

              <p
                className={`${isProfileComplete ? "text-[#1DC31D]" : "text-[#F4A316]"} text-[10px] font-normal`}
              >
                {isProfileComplete
                  ? "Profile is Complete"
                  : "Incomplete Profile"}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
