import { API_BASE_URL, authorizationHeader } from "../api/authApi";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authorizationHeader(token),
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.detail || payload?.message || (payload && typeof payload === "object" ? Object.values(payload).flat().join(" ") : "");
    throw new Error(message || `Request failed (${response.status}).`);
  }
  return response.status === 204 ? null : response.json();
};

export const attendanceApi = {
  list: () => request("/api/attendance/"),
  history: () => request("/api/attendance/"),
  detail: (id) => request(`/api/attendance/${id}/`),
  mark: (entry) => request("/api/attendance/", { method: "POST", body: JSON.stringify(entry) }),
  submit: (classSessionId, attendance) => request("/api/attendance/submit/", {
    method: "POST",
    body: JSON.stringify({ class_session_id: classSessionId, attendance }),
  }),
  update: (id, entry) => request(`/api/attendance/${id}/`, { method: "PATCH", body: JSON.stringify(entry) }),
  remove: (id) => request(`/api/attendance/${id}/`, { method: "DELETE" }),
};
