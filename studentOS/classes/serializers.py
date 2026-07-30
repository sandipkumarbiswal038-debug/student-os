from rest_framework import serializers
from .models import ClassSession

class ClassSessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClassSession
        fields = [
            "id",
            "subject",
            "course",
            "section",
            "semester",
            "date",
            "start_time",
            "end_time",
        ]