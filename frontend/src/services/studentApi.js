import { authenticatedRequest } from "../api/authApi";

const matches = (left, right) => left != null && right != null && String(left).trim().toLowerCase() === String(right).trim().toLowerCase();
const studentDetails = (entry) => entry.student ?? entry.user ?? entry;
const studentIdOf = (entry) => {
  if (typeof entry.student === "string" || typeof entry.student === "number") return entry.student;
  if (typeof entry.user === "string" || typeof entry.user === "number") return entry.user;
  const student = studentDetails(entry);
  return student.id ?? entry.student_id ?? entry.user_id ?? entry.id;
};
const courseOf = (entry) => {
  const student = studentDetails(entry);
  return student.course?.name ?? student.course_name ?? student.course ?? entry.course?.name ?? entry.course_name ?? entry.course;
};

// Kept for the faculty attendance screen. The deployed student API can be
// configured without changing components by setting VITE_STUDENTS_API_PATH.
export const studentApi = {
  list: async () => {
    const payload = await authenticatedRequest("/api/users/", localStorage.getItem("authToken"));
    const users = Array.isArray(payload) ? payload : payload?.results || payload?.data || [];
    return users.filter((user) => user.role?.toLowerCase() === "student");
  },
  classRoll: async (classSessionId, course) => {
    if (!classSessionId) throw new Error("Class session is required to load the roll.");
    const payload = await authenticatedRequest(
      `/api/class-sessions/${classSessionId}/roll/`,
      localStorage.getItem("authToken")
    );
    const rollEntries = Array.isArray(payload)
      ? payload
      : payload?.students || payload?.results || payload?.data || [];

    // The roll endpoint can return only IDs, while /api/users/ contains the
    // student's name and course. Join the two responses before filtering so
    // an MCA roll is never rendered as an empty attendance sheet.
    const allStudents = await studentApi.list();
    const studentsById = new Map(allStudents.map((student) => [String(student.id), student]));
    const users = rollEntries.map((entry) => {
      const profile = studentsById.get(String(studentIdOf(entry)));
      return profile ? { ...entry, ...profile } : entry;
    });

    return users.filter((user) => {
      const student = studentDetails(user);
      const isStudent = !student.role || student.role.toLowerCase() === "student";
      // A faculty member can only mark the students from the selected class's
      // course (for example, MCA). The server-side roll remains authoritative.
      return isStudent && (!course || matches(courseOf(user), course));
    });
  },
};
