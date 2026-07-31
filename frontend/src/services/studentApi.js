import { authenticatedRequest } from "../api/authApi";

// Kept for the faculty attendance screen. The deployed student API can be
// configured without changing components by setting VITE_STUDENTS_API_PATH.
export const studentApi = {
  list: async () => {
    const payload = await authenticatedRequest("/api/users/", localStorage.getItem("authToken"));
    const users = Array.isArray(payload) ? payload : payload?.results || payload?.data || [];
    return users.filter((user) => user.role?.toLowerCase() === "student");
  },
};
