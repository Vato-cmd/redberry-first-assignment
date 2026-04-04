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
    setErrors({
      general: data.message || "Login failed",
    });
    return;
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
