from datetime import timedelta

from django.db import IntegrityError, transaction
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response

from classes.models import ClassSession
from faculty_subject.models import FacultySubject
from student.models import Student
from users.models import User
from .models import Attendance, Enrollment
from .serializers import AttendanceSerializer


def profile_for(request):
    """Map the authenticated Django account to this project's User profile."""
    return get_object_or_404(User, college_email__iexact=request.user.email)


def is_admin(profile):
    return profile.role == "Admin"


def owns_session(profile, session):
    return is_admin(profile) or FacultySubject.objects.filter(faculty=profile, subject=session.subject).exists()


class FacultyOrAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            return profile_for(request).role in {"Faculty", "Admin"}
        except Exception:
            return False


class StudentOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            return profile_for(request).role == "Student"
        except Exception:
            return False


class AttendanceListView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [FacultyOrAdmin]

    def get_queryset(self):
        profile = profile_for(self.request)
        rows = Attendance.objects.select_related("student", "class_session__subject", "marked_by")
        return rows if is_admin(profile) else rows.filter(class_session__subject__faculty_subjects__faculty=profile)


@api_view(["POST"])
@permission_classes([FacultyOrAdmin])
def submit_attendance(request):
    session_id = request.data.get("class_session_id")
    entries = request.data.get("attendance")
    if not session_id or not isinstance(entries, list) or not entries:
        return Response({"detail": "class_session_id and a non-empty attendance list are required."}, status=400)

    session = get_object_or_404(ClassSession.objects.select_related("subject"), pk=session_id)
    profile = profile_for(request)
    if not owns_session(profile, session):
        return Response({"detail": "You can only mark attendance for your assigned class."}, status=403)
    if not session.happened:
        return Response({"detail": "Attendance cannot be submitted for a Not Held class."}, status=400)
    if Attendance.objects.filter(class_session=session).exists():
        return Response({"detail": "Attendance has already been submitted for this class session."}, status=400)

    student_ids = [item.get("student_id") for item in entries if isinstance(item, dict)]
    if len(student_ids) != len(entries) or not all(student_ids) or len(set(student_ids)) != len(student_ids):
        return Response({"detail": "Each student_id must occur exactly once."}, status=400)
    if any(item.get("status") not in {"Present", "Absent"} for item in entries):
        return Response({"detail": "status must be Present or Absent."}, status=400)
    enrolled_ids = set(Enrollment.objects.filter(subject=session.subject, student_id__in=student_ids).values_list("student_id", flat=True))
    if enrolled_ids != set(student_ids):
        return Response({"detail": "Only students enrolled in this subject can be marked."}, status=400)

    try:
        with transaction.atomic():
            Attendance.objects.bulk_create([
                Attendance(student_id=item["student_id"], class_session=session, status=item["status"], marked_by=profile)
                for item in entries
            ])
    except IntegrityError:
        return Response({"detail": "Attendance has already been submitted for this class session."}, status=400)
    return Response({"detail": "Attendance submitted.", "class_session_id": session.id, "count": len(entries)}, status=201)


@api_view(["GET", "PATCH"])
@permission_classes([FacultyOrAdmin])
def attendance_record(request, pk):
    record = get_object_or_404(Attendance.objects.select_related("class_session__subject"), pk=pk)
    profile = profile_for(request)
    if request.method == "GET":
        if not owns_session(profile, record.class_session):
            return Response({"detail": "Not permitted."}, status=403)
        return Response(AttendanceSerializer(record).data)
    if not is_admin(profile) and record.marked_by_id != profile.id:
        return Response({"detail": "Only the faculty member who marked this record can correct it."}, status=403)
    if not is_admin(profile) and timezone.now() > record.marked_at + timedelta(hours=24):
        return Response({"detail": "Attendance is locked after 24 hours."}, status=403)
    new_status = request.data.get("status")
    if new_status not in {"Present", "Absent"}:
        return Response({"detail": "status must be Present or Absent."}, status=400)
    record.status, record.corrected_at, record.corrected_by = new_status, timezone.now(), profile
    record.save(update_fields=["status", "corrected_at", "corrected_by"])
    return Response(AttendanceSerializer(record).data)


def metrics(student, subject):
    held = ClassSession.objects.filter(subject=subject, happened=True)
    total = held.count()
    present = Attendance.objects.filter(student=student, class_session__in=held, status="Present").count()
    absent = Attendance.objects.filter(student=student, class_session__in=held, status="Absent").count()
    percentage = round((present / total) * 100, 2) if total else 0.0
    needed = max(0, -(-((75 * total) - (100 * present)) // 25)) if total else 0
    return present, total, absent, percentage, needed


@api_view(["GET"])
@permission_classes([StudentOnly])
def attendance_summary(request):
    student = get_object_or_404(Student, user=profile_for(request))
    result = []
    for enrollment in Enrollment.objects.filter(student=student).select_related("subject"):
        present, held, _, percentage, _ = metrics(student, enrollment.subject)
        result.append({"subject": {"id": enrollment.subject_id, "name": enrollment.subject.subject_name, "code": enrollment.subject.subject_code}, "attended": present, "classes_held": held, "percentage": percentage, "warning": held > 0 and percentage < 75})
    return Response(result)


@api_view(["GET"])
@permission_classes([StudentOnly])
def subject_attendance(request, subject_id):
    student = get_object_or_404(Student, user=profile_for(request))
    enrollment = get_object_or_404(Enrollment.objects.select_related("subject"), student=student, subject_id=subject_id)
    present, held, absent, percentage, needed = metrics(student, enrollment.subject)
    return Response({"subject": {"id": enrollment.subject_id, "name": enrollment.subject.subject_name, "code": enrollment.subject.subject_code}, "attended": present, "classes_held": held, "absent": absent, "percentage": percentage, "warning": held > 0 and percentage < 75, "projection": {"if_next_class_present": round(((present + 1) / (held + 1)) * 100, 2), "classes_needed_for_75_percent": needed}})
