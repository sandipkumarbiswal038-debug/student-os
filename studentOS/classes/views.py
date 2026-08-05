from datetime import date

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from attendance.models import Attendance, Enrollment
from faculty_subject.models import FacultySubject
from users.models import User
from .models import ClassSession
from .serializers import ClassSessionSerializer


def profile_for(request):
    return get_object_or_404(User, college_email__iexact=request.user.email)


def can_manage(profile, session):
    return profile.role == "Admin" or FacultySubject.objects.filter(faculty=profile, subject=session.subject).exists()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def today_sessions(request):
    profile = profile_for(request)
    if profile.role not in {"Faculty", "Admin"}:
        return Response({"detail": "Faculty access required."}, status=403)
    rows = ClassSession.objects.filter(date=date.today()).select_related("subject")
    if profile.role != "Admin":
        # A faculty may have duplicate legacy assignments; return each session once.
        rows = rows.filter(subject__faculty_subjects__faculty=profile).distinct()
    return Response(ClassSessionSerializer(rows, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_not_held(request, session_id):
    session = get_object_or_404(ClassSession.objects.select_related("subject"), pk=session_id)
    profile = profile_for(request)
    if not can_manage(profile, session):
        return Response({"detail": "You can only modify your assigned class."}, status=403)
    if Attendance.objects.filter(class_session=session).exists():
        return Response({"detail": "Attendance already exists for this session."}, status=400)
    session.happened = False
    session.save(update_fields=["happened"])
    return Response(ClassSessionSerializer(session).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def session_roll(request, session_id):
    session = get_object_or_404(ClassSession.objects.select_related("subject"), pk=session_id)
    profile = profile_for(request)
    if not can_manage(profile, session):
        return Response({"detail": "You can only view rolls for your assigned class."}, status=403)
    enrolled = Enrollment.objects.filter(subject=session.subject).select_related("student__user")
    return Response({"class_session_id": session.id, "students": [{"id": row.student_id, "name": row.student.user.name, "registration_no": row.student.user.registration_no, "college_email": row.student.user.college_email} for row in enrolled]})
