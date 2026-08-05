from rest_framework import serializers

from .models import Attendance, Enrollment


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["id", "student", "class_session", "status", "marked_by", "marked_at", "corrected_at", "corrected_by"]
        read_only_fields = ["marked_by", "marked_at", "corrected_at", "corrected_by"]


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ["id", "student", "subject"]
