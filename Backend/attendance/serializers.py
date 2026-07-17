from rest_framework import serializers
from .models import Attendance


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = [
            "attendance_id",
            "class_session",
            "student",
            "status",
            "marked_by",
            "marked_at",
            "corrected_at",
            "corrected_by",
        ]
        read_only_fields = ["attendance_id", "marked_by", "marked_at", "corrected_at", "corrected_by"]


class AttendanceSubjectSummarySerializer(serializers.Serializer):
    """
    One row per subject for the student's attendance summary view.
    Not tied to a single model — built from aggregated query results.
    """
    subject_id = serializers.UUIDField()
    subject_name = serializers.CharField()
    subject_code = serializers.CharField()
    classes_held = serializers.IntegerField()
    classes_attended = serializers.IntegerField()
    percentage = serializers.FloatField()
    below_threshold = serializers.BooleanField()