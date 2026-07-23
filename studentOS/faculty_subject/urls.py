from django.urls import path
from .views import( FacultySubjectListCreateView, FacultySubjectDetailView, MyClassesView,)

urlpatterns = [
    path("", FacultySubjectListCreateView.as_view(), name="faculty-subject-list"),
    path("<int:pk>/", FacultySubjectDetailView.as_view(), name="faculty-subject-detail"),
    path("my-classes/", MyClassesView.as_view(), name="my-classes"),
]