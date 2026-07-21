from django.urls import path
from .views import FacultySubjectListView

urlpatterns = [
    path("", FacultySubjectListView.as_view(), name="faculty-subject-list"),
]