from django.urls import path
from django.urls import include
from .views import subject_list, today_sessions

urlpatterns = [
    path('subjects/', subject_list, name='subject-list'),
    path('sessions/today/', today_sessions, name='today-sessions'),
    path('api/assignments/', include('assignments.urls')),
    path('api/dashboard/', include('dashboard.urls')),

]