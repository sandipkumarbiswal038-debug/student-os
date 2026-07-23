
from django.db import models
from users.models import User
from subjects.models import Subject


class Note(models.Model):
    course_name = models.CharField(max_length=100)
    semester = models.IntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    topic = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="notes/")
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="uploaded_notes"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    upvotes = models.PositiveIntegerField(default=0)
    report_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.topic


class NoteReport(models.Model):
    note = models.ForeignKey(
        Note,
        on_delete=models.CASCADE,
        related_name="reports"
    )
    reported_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    reason = models.TextField()
    reported_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.note.topic} - {self.reported_by.name}"
