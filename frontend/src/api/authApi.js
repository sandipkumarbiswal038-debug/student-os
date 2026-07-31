const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://student-os-1-59k0.onrender.com"
).replace(/\/$/, "");

const toError = async (response) => {
  const payload = await response.json().catch(() => null);
  if (payload?.detail) return payload.detail;
  if (payload && typeof payload === "object") {
    return Object.entries(payload)
      .map(([field, value]) => `${field}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("; ");
  }
  return `Request failed (${response.status}).`;
};

export const apiRequest = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error("Unable to reach the login server. Please try again shortly.");
  }

  if (!response.ok) {
    const error = new Error(await toError(response));
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ? null : response.json();
};

export const loginUser = async (email, password, role) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ college_email: email.trim().toLowerCase(), password, role }),
  };

  let data;
  try {
    // Isolated API endpoint; it does not alter the existing HTML login flow.
    data = await apiRequest("/custom-login/api-login/", options);
  } catch (error) {
    // Supports the alternate route used by another backend deployment.
    if (error.status !== 404) throw error;
    data = await apiRequest("/api/auth/login/", options);
  }

  // Keep the small Axios-like shape used by the existing login pages.
  return { data };
};

export const authenticatedRequest = (path, token, options = {}) =>
  apiRequest(path, {
    ...options,
    headers: {
      Authorization: `Token ${token}`,
      ...(options.headers || {}),
    },
  });

export { API_BASE_URL };
