import { authenticatedRequest } from "./authApi";

export const getSubjectAttendance = async (token, student, subject) => {
  const subjectId = subject?.id ?? subject?.subject_id;
  if (subjectId === undefined || subjectId === null) throw new Error("Subject is required.");
  const payload = await authenticatedRequest(`/api/attendance/student/attendance/${subjectId}/`, token);
  const record = payload?.data || payload?.results?.[0] || payload;
  const total = Number(record?.total ?? record?.total_classes ?? record?.classes_held ?? 0);
  const attended = Number(record?.attended ?? record?.present ?? record?.present_classes ?? 0);
  return {
    total,
    attended,
    absent: Number(record?.absent ?? record?.absent_classes ?? Math.max(0, total - attended)),
    notHeld: Number(record?.not_held ?? 0),
    percentage: Number(record?.percentage ?? record?.attendance_percentage ?? (total ? Math.round((attended / total) * 100) : 0)),
  };
};
