import { authenticatedRequest } from "./authApi";

export const getStudentDashboard = async (token, user) => {
  const [users, subjects] = await Promise.all([
    authenticatedRequest("/api/users/", token),
    authenticatedRequest("/api/subjects/", token),
  ]);

  const profile = Array.isArray(users)
    ? users.find(
        (item) =>
          item.college_email?.toLowerCase() === user.college_email?.toLowerCase()
      )
    : null;

  return { user: profile ? { ...user, ...profile } : user, subjects };
};
