export function validateSignup(formData, step) {
  const errors = {};

  if (step >= 1) {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
  }

  if (step >= 2) {
    if (formData.password.trim().length < 3) {
      errors.password = "Password must be at least 3 characters";
    } else if (formData.confirmPassword !== formData.password) {
      errors.password = "Passwords do not match";
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (step >= 3) {
    if (formData.username.trim().length < 3) {
      errors.password = "Username must be at least 3 characters";
    }
  }

  return errors;
}
