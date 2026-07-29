const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://student-os-1-59k0.onrender.com"
).replace(/\/$/, "");

const getErrorMessage = async (response) => {
  const payload = await response.json().catch(() => null);
  if (payload && typeof payload === "object") {
    return Object.entries(payload)
      .map(([field, message]) => `${field}: ${Array.isArray(message) ? message.join(", ") : message}`)
      .join("; ");
  }
  return `Request failed (${response.status})`;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  if (response.status === 204) return null;
  return response.json();
};

export const attendanceApi = {
  list: () => request("/api/attendance/"),
  history: () => request("/api/attendance/history/"),
  detail: (id) => request(`/api/attendance/${id}/`),
  mark: (entry) => request("/api/attendance/mark/", { method: "POST", body: JSON.stringify(entry) }),
  update: (id, entry) => request(`/api/attendance/${id}/update/`, { method: "PATCH", body: JSON.stringify(entry) }),
  remove: (id) => request(`/api/attendance/${id}/delete/`, { method: "DELETE" }),
};

export { API_BASE_URL };