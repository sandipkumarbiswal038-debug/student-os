from django.urls import path
from . import views

urlpatterns = [
    path("", views.today_sessions, name="class-session-list"),
    path("today/", views.today_sessions, name="class-session-today"),
    path("<int:session_id>/not-held/", views.mark_not_held, name="class-session-not-held"),
    path("<int:session_id>/roll/", views.session_roll, name="class-session-roll"),
]
