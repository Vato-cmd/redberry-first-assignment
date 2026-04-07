export function validateSignup(formData, step) {
  const errors = {};

  if (step === 1) {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (formData.email.length < 3) {
      errors.email = "Email must be at least 3 characters";
    }
    if (!email) {
      errors.email = "Email is required";
    }
  }

  if (step === 2) {
    if (formData.password.trim().length < 3) {
      errors.password = "Password must be at least 3 characters";
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (step === 3) {
    if (formData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
  }
  return errors;
}
