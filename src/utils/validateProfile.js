export function validateProfile(formData) {
  const errors = {};

  const fullName = formData.fullName.trim();
  const mobileNumber = formData.mobileNumber.replace(/\s+/g, "");
  const age = String(formData.age).trim();

  if (!fullName) {
    errors.fullName = "Name is required";
  } else if (fullName.length < 3) {
    errors.fullName = "Name must be at least 3 characters";
  } else if (fullName.length > 50) {
    errors.fullName = "Name must not exceed 50 characters";
  }

  if (!mobileNumber) {
    errors.mobileNumber = "Mobile number is required";
  } else if (!/^\d+$/.test(mobileNumber)) {
    errors.mobileNumber =
      "Please enter a valid Georgian mobile number (9 digits starting with 5)";
  } else if (!mobileNumber.startsWith("5")) {
    errors.mobileNumber = "Georgian mobile numbers must start with 5";
  } else if (mobileNumber.length !== 9) {
    errors.mobileNumber = "Mobile number must be exactly 9 digits";
  }

  if (!age) {
    errors.age = "Age is required";
  } else if (!/^\d+$/.test(age)) {
    errors.age = "Age must be a number";
  } else if (Number(age) < 16) {
    errors.age = "You must be at least 16 years old to enroll";
  } else if (Number(age) > 120) {
    errors.age = "Please enter a valid age";
  }

  return errors;
}
