from django.urls import path
from . import views

urlpatterns = [
    path("", views.AttendanceListView.as_view(), name="attendance-list"),
    path("submit/", views.submit_attendance, name="attendance-submit"),
    path("<int:pk>/", views.attendance_record, name="attendance-record"),
    path("student/attendance-summary/", views.attendance_summary, name="attendance-summary"),
    path("student/attendance/<int:subject_id>/", views.subject_attendance, name="subject-attendance"),
]
