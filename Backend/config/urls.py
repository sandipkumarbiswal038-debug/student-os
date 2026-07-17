from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/",include("core.urls")),
    path("api/assignments/", include("assignments.urls")),
    path("api/notifications/",include("notifications.urls")),
    path("api/events/",include("events.urls")),
    path('api/notes/', include('notes.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]