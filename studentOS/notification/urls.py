from django.urls import path
from .views import NotificationListView, create_notification, mark_notification_read

urlpatterns = [
    path("", NotificationListView.as_view(), name="notification-list"),
    path("create/", create_notification, name="notification-create"),
    path("<int:notification_id>/read/", mark_notification_read, name="notification-read"),
]
