from rest_framework import serializers
from .models import Subject
from .models import ClassSession


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'code', 'batch', 'semester']
       
     

class ClassSessionSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    subject_code = serializers.CharField(source='subject.code', read_only=True)
    faculty_name = serializers.CharField(source='faculty.name', read_only=True)

    class Meta:
        model = ClassSession
        fields = ['id', 'subject_name', 'subject_code', 'faculty_name', 'day_of_week', 'start_time', 'end_time', 'room']