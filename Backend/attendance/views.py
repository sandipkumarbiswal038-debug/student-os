
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.models import ClassSession, Subject
from .models import Attendance
from .serializers import AttendanceSerializer, AttendanceSubjectSummarySerializer
from accounts.models import User


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def student_attendance_summary(request):
    """
    Returns the logged-in student's attendance percentage per subject.
    'Classes held' = distinct ClassSessions where an Attendance row
    exists for this student (since attendance is only marked when a
    class actually happens).
    """
    student = request.user

    subjects = Subject.objects.filter(batch=student.batch)
    summary = []

    for subject in subjects:
        student_records = Attendance.objects.filter(
            student=student,
            class_session__subject=subject,
        )

        classes_held = student_records.values("class_session").distinct().count()
        classes_attended = student_records.filter(status="present").count()

        percentage = (
            round((classes_attended / classes_held) * 100, 2)
            if classes_held > 0
            else 0.0
        )

        summary.append({
            "subject_id": subject.id,
            "subject_name": subject.name,
            "subject_code": subject.code,
            "classes_held": classes_held,
            "classes_attended": classes_attended,
            "percentage": percentage,
            "below_threshold": percentage < 75.0,
        })

    serializer = AttendanceSubjectSummarySerializer(summary, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_attendance(request):
    """
    Faculty submits attendance for a class session.
    Expects: { "class_session_id": "...", "records": [ {"student_id": "...", "status": "present"}, ... ] }
    """
    faculty = request.user

    if faculty.role != "faculty":
        return Response(
            {"detail": "Only faculty can submit attendance."},
            status=status.HTTP_403_FORBIDDEN,
        )

    class_session_id = request.data.get("class_session_id")
    records = request.data.get("records", [])

    if not class_session_id or not records:
        return Response(
            {"detail": "class_session_id and records are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        class_session = ClassSession.objects.get(id=class_session_id)
    except ClassSession.DoesNotExist:
        return Response(
            {"detail": "Class session not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    # Reject duplicate submission for this class session
    if Attendance.objects.filter(class_session=class_session).exists():
        return Response(
            {"detail": "Attendance already submitted for this class. Use the correction endpoint instead."},
            status=status.HTTP_409_CONFLICT,
        )

    created_records = []
    for record in records:
        student_id = record.get("student_id")
        record_status = record.get("status")

        if record_status not in ("present", "absent"):
            continue

        attendance = Attendance.objects.create(
            class_session=class_session,
            student_id=student_id,
            status=record_status,
            marked_by=faculty,
        )
        created_records.append(attendance)

    serializer = AttendanceSerializer(created_records, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


import datetime


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def faculty_today_classes(request):
    """
    Returns the logged-in faculty's class sessions scheduled for today.
    """
    faculty = request.user

    if faculty.role != "faculty":
        return Response(
            {"detail": "Only faculty can view their class schedule."},
            status=status.HTTP_403_FORBIDDEN,
        )

    today_name = datetime.datetime.now().strftime("%A")  # e.g. "Tuesday"

    sessions = ClassSession.objects.filter(
        faculty=faculty,
        day_of_week=today_name,
    ).select_related("subject")

    data = [
        {
            "class_session_id": s.id,
            "subject_name": s.subject.name,
            "subject_code": s.subject.code,
            "start_time": s.start_time,
            "end_time": s.end_time,
            "room": s.room,
        }
        for s in sessions
    ]
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def class_roll(request, class_session_id):
    """
    Returns the roll for a specific class session — all students in that
    subject's batch, with their attendance status if already marked.
    """
    faculty = request.user

    if faculty.role != "faculty":
        return Response(
            {"detail": "Only faculty can view a class roll."},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        class_session = ClassSession.objects.select_related("subject").get(id=class_session_id)
    except ClassSession.DoesNotExist:
        return Response(
            {"detail": "Class session not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    students = User.objects.filter(role="student", batch=class_session.subject.batch)
    existing = {
        a.student_id: a.status
        for a in Attendance.objects.filter(class_session=class_session)
    }

    roll = [
        {
            "student_id": s.id,
            "name": s.name,
            "status": existing.get(s.id, "present"),  # default to Present per PRD
        }
        for s in students
    ]
    return Response(roll)