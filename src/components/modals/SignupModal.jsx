import { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import { registerUser } from "../../api/auth";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AvatarUpload from "../UI/AvatarUpload";
import toast from "react-hot-toast";

import { validateSignup } from "../../utils/validateSignup";
import { useAuth } from "../../context/AuthContext";

export default function SignupModal() {
  const { closeModal, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  function handleRemoveAvatar() {
    setFormData((prev) => ({
      ...prev,
      avatar: null,
    }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Avatar must be a .JPG, .PNG or .WebP",
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

  function handleNextStep() {
    const newErrors = validateSignup(formData, step);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setErrors({});
    setStep((prev) => prev + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validateSignup(formData, step);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsLoading(true);
      const data = await registerUser(formData);

      login(data.data.user, data.data.token);
      closeModal();
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      className="max-w-115 p-12.5"
      showBackwardsArrow={step > 1}
      onBack={() => setStep((prev) => prev - 1)}
    >
      <div>
        <h2 className="text-[32px] font-semibold text-center text-[#0A0A0A] mt-[5.5px]">
          Create Account
        </h2>

        <p className="text-center text-[#666666] text-[14px] mt-1.5 font-medium">
          Join and start learning today
        </p>
      </div>
      <div className="flex gap-2 my-6 w-full">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-2 flex-1 rounded-full"
            style={{
              backgroundColor:
                item < step ? "#4F46E5" : item === step ? "#B7B3F4" : "#EEEDFC",
            }}
          ></div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-6 w-90 mx-auto"
      >
        {step === 1 && (
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
            required
          />
        )}

        {step === 2 && (
          <>
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />
          </>
        )}

        {step === 3 && (
          <>
            <Input
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
              error={touched.username ? errors.username : ""}
              required
            />

            <AvatarUpload
              onChange={handleAvatarChange}
              error={errors.avatar}
              file={formData.avatar}
              onRemove={handleRemoveAvatar}
            />
          </>
        )}
        {errors.general && (
          <p className="text-red-500 text-[14px] text-center">
            {errors.general}
          </p>
        )}
        {step < 3 ? (
          <Button
            type="button"
            onClick={handleNextStep}
            className="w-full rounded-lg bg-[#4F46E5] p-2.5 text-white text-[18px] font-medium "
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full rounded-xl bg-[#4F46E5] p-2.5 text-white text-[18px] font-medium "
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        )}
      </form>
      <div>
        <div className="relative w-[320px] mx-auto border-t border-[#D1D1D1] mt-[25.19px]">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-[14px] text-[#8A8A8A] font-medium">
            or
          </span>
        </div>
        <p className="flex items-center justify-center gap-2 text-center mt-6 mr-2 text-[12px] font-normal text-[#666666]">
          Already have an account?
          <Button
            type="button"
            className="text-[#141414] underline underline-offset-[25%] text-[14px] font-medium"
            onClick={() => openModal("login")}
          >
            Log In
          </Button>
        </p>
      </div>
    </Modal>
  );
}
