
from django.urls import path
from .views import notification_list, mark_notification_read, create_notification

urlpatterns = [
    path('notifications/', notification_list, name='notification-list'),
    path('notifications/<int:pk>/read/', mark_notification_read, name='mark-notification-read'),
    path('notifications/create/', create_notification, name='create-notification'),
]