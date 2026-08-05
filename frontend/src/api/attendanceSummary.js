import { authenticatedRequest } from "./authApi";

const listFromResponse = (payload) =>
  Array.isArray(payload) ? payload : payload?.results || payload?.data || [];

const sameValue = (left, right) =>
  left !== undefined && left !== null && right !== undefined && right !== null &&
  String(left).toLowerCase() === String(right).toLowerCase();

const studentIdFrom = (entry) =>
  entry.student?.id ?? entry.student_id ?? entry.student ?? entry.user?.id ?? entry.user_id ?? entry.user;

const subjectIdFrom = (entry) =>
  entry.subject?.id ?? entry.subject_id ?? entry.subject ?? entry.subject_code ??
  entry.class_session?.subject?.id ?? entry.class_session?.subject_id ?? entry.class_session?.subject;

const isNotHeld = (entry) =>
  String(entry.status ?? entry.attendance_status ?? "").trim().toLowerCase() === "not held";

const isPresent = (entry) => {
  const value = entry.status ?? entry.attendance_status ?? entry.present ?? entry.is_present;
  return value === true || String(value).trim().toLowerCase() === "present";
};

export const summarizeAttendance = (entries, studentId, subject) => {
  const subjectValues = [subject?.id, subject?.code, subject?.subject_code, subject?.name, subject?.subject_name]
    .filter((value) => value !== undefined && value !== null && value !== "");
  const studentRecords = entries.filter((entry) => sameValue(studentIdFrom(entry), studentId));
  const records = subject
    ? studentRecords.filter((entry) => subjectValues.some((value) => sameValue(subjectIdFrom(entry), value)))
    : studentRecords;
  const counted = records.filter((entry) => !isNotHeld(entry));
  const attended = counted.filter(isPresent).length;

  return {
    total: counted.length,
    attended,
    absent: Math.max(0, counted.length - attended),
    notHeld: records.length - counted.length,
    percentage: counted.length ? Math.round((attended / counted.length) * 100) : 0,
  };
};

export const getStudentAttendanceSummaries = async (token, student, subjects) => {
  const [payload, sessionsPayload] = await Promise.all([
    authenticatedRequest("/api/attendance/", token),
    authenticatedRequest("/api/class-sessions/", token).catch(() => []),
  ]);
  const sessionSubjects = new Map(listFromResponse(sessionsPayload).map((session) => [
    String(session.id), session.subject?.id ?? session.subject_detail?.id ?? session.subject_info?.id ?? session.subject_id ?? session.subjectId ?? session.subject,
  ]));
  const entries = listFromResponse(payload).map((entry) => ({
    ...entry,
    // Some API versions return only a class-session ID on attendance records.
    // Resolve it before matching records against the student's subject list.
    subject: entry.subject ?? entry.subject_id ?? sessionSubjects.get(String(entry.class_session?.id ?? entry.class_session_id ?? entry.class_session)),
  }));
  return new Map(
    subjects.map((subject) => [String(subject.id ?? subject.code ?? subject.name), summarizeAttendance(entries, student?.id, subject)])
  );
};
