import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { authenticatedUser } from "../../api/auth";
import profileOrange from "../../assets/profile-orange.svg";
import profileGreen from "../../assets/profile-green.svg";
import AvatarUpload from "../UI/AvatarUpload";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function ProfileModal() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    age: "",
    avatar: null,
  });

  const { closeModal } = useModal();
  const { token, isProfileComplete } = useAuth();
  console.log(userProfile);

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);
        const data = await authenticatedUser(token);

        setUserProfile(data.data);

        setFormData({
          fullName: data.data.fullName || "",
          email: data.data.email || "",
          mobileNumber: data.data.mobileNumber || "",
          age: data.data.age !== null ? String(data.data.age) : "",
        });
      } catch (error) {
        setLoadError(error.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }
    if (token) {
      loadProfile();
    }
  }, [token]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Avatar must be .JPG, .PNG, .WebP",
      }));
      return;
    }
    setErrors((prev) => ({
      ...prev,
      avatar: "",
    }));

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  }

  function handleRemoveAvatar() {
    setFormData((prev) => ({
      ...prev,
      avatar: null,
    }));
  }

  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-115">
      {isLoading ? (
        <div>User credentials...</div>
      ) : loadError ? (
        <div className="text-[#F4161A]">{loadError}</div>
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
          <form className="flex flex-col gap-5">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true}
            />
            <div className="flex gap-3">
              <Input
                label="Mobile Number"
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <Input
                label="Age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <AvatarUpload
              file={formData.avatar}
              onChange={handleAvatarChange}
              onRemove={handleRemoveAvatar}
            />

            <Button
              type="button"
              onClick={() => {
                if (!isEditing) {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Save Profile" : "Update Profile"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
