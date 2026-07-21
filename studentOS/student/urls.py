from django.urls import path
from .views import StudentListView
from .views import StudentUpdateAPIView

urlpatterns = [
    path("", StudentListView.as_view(),
         name="student-list"),
    path("update/<int:pk>/",StudentUpdateAPIView.as_view(),
        name="student-update"),
]