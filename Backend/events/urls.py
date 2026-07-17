from django.urls import path
from . import views

urlpatterns = [
    path('', views.event_list, name='event-list'),
    path('create/', views.create_event, name='event-create'),
    path('<uuid:event_id>/', views.event_detail, name='event-detail'),
    path('<uuid:event_id>/signup/', views.signup_for_event, name='event-signup'),
    path('<uuid:event_id>/cancel/', views.cancel_signup, name='event-cancel'),
    path('<uuid:event_id>/signups/', views.event_signups, name='event-signups'),
    path('signups/<uuid:signup_id>/attendance/', views.mark_attendance, name='signup-attendance'),
path('<uuid:event_id>/cancel-event/', views.cancel_event, name='event-cancel-event'),
]