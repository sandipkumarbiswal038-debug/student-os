from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.AssignmentCreateView.as_view(), name='assignment-create'),
    path('', views.AssignmentListView.as_view(), name='assignment-list'),
    path('<uuid:assignment_id>/submit/', views.SubmitAssignmentView.as_view(), name='assignment-submit'),
    path('submission/<uuid:pk>/grade/', views.GradeSubmissionView.as_view(), name='assignment-grade'),
]