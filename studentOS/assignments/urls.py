from django.urls import path
from .views import (
    AssignmentListView,
    AssignmentCreateView,
    AssignmentDetailView,
    AssignmentUpdateView,
    AssignmentDeleteView,
    AssignmentSubmissionCreateView,
    AssignmentSubmissionListView,
)

urlpatterns = [
    path("", AssignmentListView.as_view(), name="assignment-list"),
    path("create/", AssignmentCreateView.as_view(), name="assignment-create"),
    path("<int:pk>/", AssignmentDetailView.as_view(), name="assignment-detail"),
    path("<int:pk>/update/", AssignmentUpdateView.as_view(), name="assignment-update"),
    path("<int:pk>/delete/", AssignmentDeleteView.as_view(), name="assignment-delete"),
    path("submit/", AssignmentSubmissionCreateView.as_view(), name="assignment-submit"),
    path("submissions/", AssignmentSubmissionListView.as_view(), name="submission-list"),
]