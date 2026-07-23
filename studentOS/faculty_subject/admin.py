from django.contrib import admin
from .models import FacultySubject

@admin.register(FacultySubject)
class FacultySubjectAdmin(admin.ModelAdmin):
    list_display = ("faculty", "subject")
    search_fields = ("faculty__name", "subject__subject_name")
