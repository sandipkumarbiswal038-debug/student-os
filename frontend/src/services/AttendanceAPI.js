import { API_BASE_URL } from "../api/authApi";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`Request failed (${response.status}).`);
  return response.status === 204 ? null : response.json();
};

export const attendanceApi = {
  list: () => request("/api/attendance/"),
  history: () => request("/api/attendance/"),
  detail: (id) => request(`/api/attendance/${id}/`),
  mark: (entry) => request("/api/attendance/", { method: "POST", body: JSON.stringify(entry) }),
  update: (id, entry) => request(`/api/attendance/${id}/`, { method: "PATCH", body: JSON.stringify(entry) }),
  remove: (id) => request(`/api/attendance/${id}/`, { method: "DELETE" }),
};
