from rest_framework import serializers
from .models import Note, NoteUpvote, NoteReport


class NoteSerializer(serializers.ModelSerializer):
    uploader_name = serializers.CharField(source='uploaded_by.name', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)

    class Meta:
        model = Note
        fields = ["note_id", "title", "subject", "subject_name", "uploaded_by", "uploader_name",
                   "file_url", "description", "download_count", "upvote_count", "status", "uploaded_at"]
        read_only_fields = ["note_id", "uploaded_by", "download_count", "upvote_count", "status", "uploaded_at"]


class NoteReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteReport
        fields = ["report_id", "note", "reported_by", "reason", "status", "created_at"]
        read_only_fields = ["report_id", "reported_by", "status", "created_at"]