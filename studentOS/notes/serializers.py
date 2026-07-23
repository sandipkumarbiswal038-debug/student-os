from rest_framework import serializers
from .models import Note, NoteReport

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"


class NoteReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteReport
        fields = "__all__"