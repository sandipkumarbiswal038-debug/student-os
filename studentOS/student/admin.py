from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "registration_no", "semester")

    @admin.display(description="Registration No")
    def registration_no(self, obj):
        return obj.user.registration_no

# Register your models here.
