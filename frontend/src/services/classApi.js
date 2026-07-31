import { authenticatedRequest } from "../api/authApi";

export const classApi = {
  list: async () => {
    const payload = await authenticatedRequest("/api/class-sessions/", localStorage.getItem("authToken"));
    return Array.isArray(payload) ? payload : payload?.results || payload?.data || [];
  },
};
