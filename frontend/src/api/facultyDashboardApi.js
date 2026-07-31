import { authenticatedRequest } from "./authApi";

const asList = (value) => Array.isArray(value) ? value : value?.results || value?.data || [];
const valueOf = (item) => item?.id ?? item?.email ?? item?.college_email ?? item?.name;
const matches = (left, right) => left != null && right != null && String(left).toLowerCase() === String(right).toLowerCase();

export const getFacultyDashboard = async (token, savedUser) => {
  const [usersResponse, sessionsResponse] = await Promise.all([
    authenticatedRequest("/api/users/", token),
    authenticatedRequest("/api/class-sessions/", token),
  ]);

  const users = asList(usersResponse);
  const faculty = users.find((user) =>
    matches(user.college_email, savedUser.college_email) || matches(user.email, savedUser.college_email)
  ) || savedUser;

  const sessions = asList(sessionsResponse).filter((session) => {
    const assignedFaculty = session.faculty?.id ?? session.faculty_id ?? session.faculty?.college_email ?? session.faculty_email ?? session.faculty;
    return !assignedFaculty || [faculty.id, faculty.college_email, faculty.email, faculty.name].some((candidate) => matches(assignedFaculty, candidate));
  });

  return { faculty, sessions };
};
