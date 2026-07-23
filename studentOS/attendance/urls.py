from django.urls import path
from .views import (
    AttendanceListView,
    AttendanceCreateView,
    AttendanceDetailView,
    AttendanceUpdateView,
    AttendanceDeleteView,
    AttendanceHistoryView,
)

urlpatterns = [
    path("", AttendanceListView.as_view(), name="attendance-list"),
    path("mark/", AttendanceCreateView.as_view(), name="attendance-create"),
    path("<int:pk>/", AttendanceDetailView.as_view(), name="attendance-detail"),
    path("<int:pk>/update/", AttendanceUpdateView.as_view(), name="attendance-update"),
    path("<int:pk>/delete/", AttendanceDeleteView.as_view(), name="attendance-delete"),
    path("history/", AttendanceHistoryView.as_view(), name="attendance-history"),
]