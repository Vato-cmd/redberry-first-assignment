import { useModal } from "../../context/ModalContext";
import { useState } from "react";
import { loginUser } from "../../api/auth.js";
import { useAuth } from "../../context/AuthContext.jsx";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { closeModal, openModal } = useModal();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsLoading(true);

      const data = await loginUser(formData);

      login(data.data.user, data.data.token);

      closeModal();
    } catch (error) {
      setErrors({
        general: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-115 p-12.5">
      <h2 className="text-[32px] font-semibold text-center">Welcome Back</h2>

      <p className="text-center text-gray-500 mt-2">
        Log in to continue your learning
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <Input
          label="Email"
          value={formData.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="you@example.com"
          error={errors.email}
          required
        />
        <Input
          label="Password"
          onChange={handleChange}
          value={formData.password}
          type="password"
          name="password"
          placeholder="••••••••"
          error={errors.password}
          required
        />

        {errors.general && (
          <p className="text-[#F4161A] text-[14px] text-center">
            {errors.general}
          </p>
        )}

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-xl bg-[#4F46E5] py-3 text-white text-[18px] font-medium "
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Logging In...
            </span>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
      <div>
        <div className="relative w-[320px] mx-auto border-t border-[#D1D1D1] mt-[25.19px]">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-[14px] text-[#8A8A8A] font-medium">
            or
          </span>
        </div>
        <p className="flex items-center justify-center gap-2 text-center mt-6 mr-2 text-[14px] text-[#666666]">
          Don't have an account?
          <Button
            className="text-[#141414] underline underline-offset-[25%] text-[14px] font-medium"
            onClick={() => openModal("signup")}
          >
            Sign Up
          </Button>
        </p>
      </div>
    </Modal>
  );
}
