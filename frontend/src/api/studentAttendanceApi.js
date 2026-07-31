import { authenticatedRequest } from "./authApi";

const listFromResponse = (payload) =>
  Array.isArray(payload) ? payload : payload?.results || payload?.data || [];

const sameValue = (left, right) =>
  left !== undefined && left !== null && String(left).toLowerCase() === String(right).toLowerCase();

export const getSubjectAttendance = async (token, student, subject) => {
  const payload = await authenticatedRequest("/api/attendance/", token);
  const entries = listFromResponse(payload);

  const studentId = student?.id;
  const subjectValues = [subject?.id, subject?.code, subject?.subject_code, subject?.name, subject?.subject_name]
    .filter(Boolean);

  const records = entries.filter((entry) => {
    const entryStudent = entry.student?.id ?? entry.student_id ?? entry.student ?? entry.user?.id ?? entry.user_id ?? entry.user;
    const entrySubject = entry.subject?.id ?? entry.subject_id ?? entry.subject?.code ?? entry.subject_code ?? entry.subject?.name ?? entry.subject_name ?? entry.subject;
    const belongsToStudent = !studentId || sameValue(entryStudent, studentId);
    const belongsToSubject = subjectValues.some((value) => sameValue(entrySubject, value));
    return belongsToStudent && belongsToSubject;
  });

  const attended = records.filter((entry) => {
    const value = entry.status ?? entry.attendance_status ?? entry.present ?? entry.is_present;
    return value === true || String(value).toLowerCase() === "present";
  }).length;

  const total = records.length;
  return {
    total,
    attended,
    percentage: total ? Math.round((attended / total) * 100) : 0,
  };
};
