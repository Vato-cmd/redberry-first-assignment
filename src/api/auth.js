const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export async function loginUser(formData) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function authenticatedUser(token) {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Fetching User Failed");
  }

  return data;
}

export async function registerUser(formData) {
  const body = new FormData();

  body.append("username", formData.username);
  body.append("email", formData.email);
  body.append("password", formData.password);
  body.append("password_confirmation", formData.confirmPassword);

  if (formData.avatar) {
    body.append("avatar", formData.avatar);
  }

  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function updateProfile(formData, token) {
  const body = new FormData();

  body.append("full_name", formData.fullName.trim());
  body.append("mobile_number", formData.mobileNumber.replace(/\s+/g, ""));
  body.append("age", formData.age);

  if (formData.avatar) {
    body.append("avatar", formData.avatar);
  }

  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Profile update failed");
  }

  return data;
}
