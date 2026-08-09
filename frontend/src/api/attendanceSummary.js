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
  // The backend calculates the student's aggregate attendance. This avoids
  // exposing or calculating totals from every student's records in the UI.
  const payload = await authenticatedRequest("/api/attendance/student/attendance-summary/", token);
  const summaries = listFromResponse(payload);

  return new Map(subjects.map((subject) => {
    const subjectValues = [subject?.id, subject?.code, subject?.subject_code, subject?.name, subject?.subject_name]
      .filter((value) => value !== undefined && value !== null && value !== "");
    const summary = summaries.find((entry) => subjectValues.some((value) =>
      sameValue(entry.subject?.id ?? entry.subject_id ?? entry.subject ?? entry.subject_code ?? entry.subject_name, value)
    ));
    const total = Number(summary?.total ?? summary?.total_classes ?? summary?.classes_held ?? 0);
    const attended = Number(summary?.attended ?? summary?.present ?? summary?.present_classes ?? 0);
    return [String(subject.id ?? subject.code ?? subject.name), {
      total,
      attended,
      absent: Number(summary?.absent ?? summary?.absent_classes ?? Math.max(0, total - attended)),
      notHeld: Number(summary?.not_held ?? 0),
      percentage: Number(summary?.percentage ?? summary?.attendance_percentage ?? (total ? Math.round((attended / total) * 100) : 0)),
    }];
  }));
};

// Retained for callers that need to calculate summaries from raw records.
export const getStudentAttendanceSummariesFromRecords = async (token, student, subjects) => {
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
