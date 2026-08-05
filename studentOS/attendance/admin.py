from django.contrib import admin
from .models import Attendance, Enrollment

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("student", "class_session", "status", "marked_by", "marked_at")

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(Enrollment)

# Register your models here.
