from django.urls import path
from . import views

urlpatterns = [
    path('summary/', views.student_attendance_summary, name='attendance-summary'),
    path('submit/', views.submit_attendance, name='attendance-submit'),
    path('today-classes/', views.faculty_today_classes, name='attendance-today-classes'),
    path('roll/<int:class_session_id>/', views.class_roll, name='attendance-roll'),
]