import { getStudentAttendanceSummaries } from "./attendanceSummary";

export const getSubjectAttendance = async (token, student, subject) => {
  const summaries = await getStudentAttendanceSummaries(token, student, [subject]);
  return summaries.get(String(subject?.id ?? subject?.code ?? subject?.name)) || {
    total: 0, attended: 0, absent: 0, notHeld: 0, percentage: 0,
  };
};
