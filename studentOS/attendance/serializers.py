
from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"

    def validate(self, data):
        student = data["student"]
        class_session = data["class_session"]

        if Attendance.objects.filter(
            student=student,
            class_session=class_session
        ).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this student."
            )

        return data