from rest_framework import serializers
from .models import ClassSession

class ClassSessionSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source="subject.subject_name", read_only=True)

    class Meta:
        model = ClassSession
        fields = [
            "id",
            "subject",
            "subject_name",
            "date",
            "start_time",
            "end_time",
        ]