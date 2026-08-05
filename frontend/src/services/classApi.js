import { authenticatedRequest } from "../api/authApi";

export const classApi = {
  list: async () => {
    const token = localStorage.getItem("authToken");
    const [sessionsPayload, subjectsPayload] = await Promise.all([
      // Faculty sees only the sessions assigned to them for the current day.
      authenticatedRequest("/api/class-sessions/today/", token),
      authenticatedRequest("/api/subjects/", token),
    ]);
    const sessions = Array.isArray(sessionsPayload) ? sessionsPayload : sessionsPayload?.results || sessionsPayload?.data || [];
    const subjects = Array.isArray(subjectsPayload) ? subjectsPayload : subjectsPayload?.results || subjectsPayload?.data || [];
    const subjectById = new Map();
    const subjectByCode = new Map();
    const subjectByName = new Map();
    subjects.forEach((subject) => {
      const key = subject.id ?? subject.subject_id ?? subject.pk;
      if (key !== undefined) subjectById.set(String(key), subject);
      const code = subject.code ?? subject.subject_code;
      const name = subject.name ?? subject.subject_name ?? subject.title ?? subject.subject_title;
      if (code) subjectByCode.set(String(code).toLowerCase(), subject);
      if (name) subjectByName.set(String(name).toLowerCase(), subject);
    });

    return sessions.map((session) => {
      const nestedSubject = session.subject_detail ?? session.subject_details ?? session.subject_info ?? session.subject;
      const subjectId = nestedSubject?.id ?? nestedSubject?.subject_id ?? session.subject_id ?? session.subjectId ?? session.subject_uuid ?? (typeof nestedSubject === "number" ? nestedSubject : undefined);
      const subjectCode = session.subject_code ?? nestedSubject?.code ?? nestedSubject?.subject_code;
      const subjectName = session.subject_name ?? session.subject_title ?? nestedSubject?.name ?? nestedSubject?.subject_name ?? nestedSubject?.title ?? nestedSubject?.subject_title ?? (typeof nestedSubject === "string" ? nestedSubject : undefined);
      const subject = subjectById.get(String(subjectId)) || subjectByCode.get(String(subjectCode || "").toLowerCase()) || subjectByName.get(String(subjectName || "").toLowerCase());
      return {
        ...session,
        // Resolve the numeric subject foreign key to its master subject name.
        subject_name: subjectName || subject?.name || subject?.subject_name || subject?.subject || subject?.title || subject?.subject_title || "Subject not assigned",
        subject_code: subjectCode || subject?.code || subject?.subject_code,
        course_name: session.course_name || session.course?.name || session.course?.course_name || session.course || "-",
        section: session.section || session.section_name || "-",
        semester: session.semester ?? session.semester_number ?? "-",
        date: session.date || session.class_date || "-",
        start_time: session.start_time || session.start || "-",
        end_time: session.end_time || session.end || "-",
      };
    });
  },
};
