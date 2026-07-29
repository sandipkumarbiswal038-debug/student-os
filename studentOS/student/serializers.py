from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    registration_no = serializers.CharField(
        source="user.registration_no",
        read_only=True
    )

    class Meta:
        model = Student
        fields = ["id", "user", "registration_no", "semester"]