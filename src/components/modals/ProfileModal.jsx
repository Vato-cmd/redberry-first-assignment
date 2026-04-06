import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { authenticatedUser } from "../../api/auth";
import { validateProfile } from "../../utils/validateProfile";
import { updateProfile } from "../../api/auth";

import profileOrange from "../../assets/profile-orange.svg";
import profileGreen from "../../assets/profile-green.svg";
import AvatarUpload from "../UI/AvatarUpload";

import tick from "../../assets/tick.svg";
import pen from "../../assets/pen.svg";
import user from "../../assets/user.svg";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function ProfileModal() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTouched, setIsTouched] = useState({});
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
  const { token, isProfileComplete, updateUser } = useAuth();
  console.log(userProfile);
  const ageOptions = Array.from({ length: 120 }, (_, i) => i + 1);

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
          avatar: null,
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

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };

      if (isTouched[name]) {
        const validationErrors = validateProfile(updatedFormData);

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validationErrors[name] || "",
        }));
      }
      return updatedFormData;
    });
  }

  async function handleProfileAction() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const validationErrors = validateProfile(formData);
    setErrors(validationErrors);

    setIsTouched({
      fullName: true,
      mobileNumber: true,
      age: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      setIsSubmitting(true);

      const data = await updateProfile(formData, token);

      setUserProfile(data.data);
      updateUser(data.data);

      setFormData({
        fullName: data.data.fullName || "",
        email: data.data.email || "",
        mobileNumber: data.data.mobileNumber || "",
        age: data.data.age !== null ? String(data.data.age) : "",
        avatar: null,
      });
      setIsEditing(false);
    } catch (error) {
      setLoadError(error.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
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

  function handleBlur(e) {
    const { name } = e.target;
    setIsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validateProfile(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name] || "",
    }));
  }

  function handleCloseModal() {
    if (!isProfileComplete) {
      const confirmClose = window.confirm(
        "Your profile is incomplete. You won't be able to enroll in courses until you complete it. Close anyway?",
      );

      if (!confirmClose) {
        return;
      }
    }
    closeModal();
  }
  const validationErrors = validateProfile(formData);
  const isFormValid = Object.keys(validationErrors).length === 0;
  return (
    <Modal isOpen={true} onClose={handleCloseModal}>
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
              {userProfile.avatar ? (
                <img
                  className="rounded-full w-14 h-14"
                  src={userProfile.avatar}
                  alt="user image"
                />
              ) : (
                <div className="relative bg-[#EEEDFC] w-14 h-14 flex items-center justify-center rounded-full cursor-pointer border-2 border-transparent hover:border-[#b7b3f4]">
                  <img src={user} alt="user logo" />
                </div>
              )}
              <img
                className="absolute top-9.75 left-9.75"
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
          <form className="flex flex-col gap-3">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Username"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={isTouched.fullName ? errors.fullName : ""}
              isValid={
                isTouched.fullName && !errors.fullName && !!formData.fullName
              }
              disabled={!isEditing}
              icons={
                isEditing
                  ? pen
                  : isTouched.fullName &&
                      !errors.fullName &&
                      !!formData.fullName
                    ? tick
                    : null
              }
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true}
              icons={tick}
            />
            <div className="flex gap-3">
              <Input
                label="Mobile Number"
                placeholder="599209820"
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={isTouched.mobileNumber ? errors.mobileNumber : ""}
                isValid={
                  isTouched.mobileNumber &&
                  !errors.mobileNumber &&
                  !!formData.mobileNumber
                }
                disabled={!isEditing}
                icons={
                  isEditing
                    ? pen
                    : isTouched.mobileNumber &&
                        !errors.mobileNumber &&
                        !!formData.mobileNumber
                      ? tick
                      : null
                }
              />
              <div className="w-21.25">
                <Input
                  label="Age"
                  type="select"
                  name="age"
                  placeholder="Age"
                  options={ageOptions}
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={isTouched.age ? errors.age : ""}
                  isValid={isTouched.age && !errors.age && !!formData.age}
                  disabled={!isEditing}
                  icons={
                    isEditing
                      ? pen
                      : isTouched.age && !errors.age && !!formData.age
                        ? tick
                        : null
                  }
                />
              </div>
            </div>
            <AvatarUpload
              file={formData.avatar}
              disabled={!isEditing}
              onChange={handleAvatarChange}
              onRemove={handleRemoveAvatar}
              error={errors.avatar}
            />

            <Button
              type="button"
              className={`rounded-lg bg-[#4F46E5] text-white font-medium text-[20px] py-4.25 px-6.25
                      ${isSubmitting || (isEditing && !isFormValid) ? "opacity-50" : ""}
                `}
              onClick={handleProfileAction}
              disabled={isSubmitting || (isEditing && !isFormValid)}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Save Profile"
                  : "Update Profile"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
