from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta

# Import from your existing apps
from core.models import ClassSession
from attendance.models import Attendance # I'm assuming your model exists
from events.models import Event, EventSignup
from assignments.models import Assignment, Submission
from notifications.models import Notification

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = timezone.now().date()
        tomorrow = today + timedelta(days=1)

        # 1. Today's Classes (assuming ClassSession has start_time as DateTimeField or DateField)
        try:
         today_name = timezone.now().strftime("%A")  # e.g. "Wednesday"
         today_classes = ClassSession.objects.filter(
        subject__batch=user.batch,
        day_of_week=today_name
    ).order_by('start_time')
         today_classes_data = [
        {"id": str(c.id), "subject": c.subject.name, "start": c.start_time, "room": c.room}
        for c in today_classes
    ]
        except Exception:
         today_classes_data = []

        # 2. Attendance Summary
        # Note: You need to write your specific aggregation logic here. 
        # For now, I'll give you a placeholder assuming your Attendance model links to user:
        try:
         from core.models import Subject
         subjects = Subject.objects.filter(batch=user.batch)
         attendance_summary = []
         for subject in subjects:
          records = Attendance.objects.filter(student=user, class_session__subject=subject)
         held = records.values("class_session").distinct().count()
         attended = records.filter(status="present").count()
         percentage = round((attended / held) * 100, 2) if held > 0 else 0.0
         attendance_summary.append({
            "subject": subject.name,
            "percentage": percentage,
            "below_threshold": percentage < 75.0,
        })
        except Exception:
         attendance_summary = []

        # 3. Pending Assignments
        try:
            pending_assignments = Assignment.objects.filter(
                subject__batch=user.batch,
                deadline__gte=timezone.now()
            ).exclude(
                submissions__student=user
            ).order_by('deadline')
            pending_data = [{"id": str(a.id), "title": a.title, "deadline": a.deadline} for a in pending_assignments]
        except:
            pending_data = []

        # 4. Upcoming Events
        try:
            upcoming_events = Event.objects.filter(
                status='active',
                starts_at__gte=timezone.now()
            ).order_by('starts_at')[:5]
            event_data = [{"id": str(e.id), "title": e.title, "starts_at": e.starts_at} for e in upcoming_events]
        except:
            event_data = []

        # 5. Recent Notifications
        try:
            notifications = Notification.objects.filter(user=user).order_by('-created_at')[:10]
            notif_data = [{"title": n.title, "message": n.message, "created_at": n.created_at} for n in notifications]
        except:
            notif_data = []

        # Return the single combined response
        return Response({
            "today_classes": today_classes_data,
            "attendance_summary": attendance_summary,
            "pending_assignments": pending_data,
            "upcoming_events": event_data,
            "notifications": notif_data
        })