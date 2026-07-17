import uuid
from django.db import models
from django.conf import settings
from core.models import ClassSession


class Attendance(models.Model):
    STATUS_CHOICES = [
        ("present", "Present"),
        ("absent", "Absent"),
    ]

    attendance_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    class_session = models.ForeignKey(
        ClassSession,
        on_delete=models.CASCADE,
        related_name="attendance_records"
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="attendance_records"
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    marked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="attendance_marked"
    )
    marked_at = models.DateTimeField(auto_now_add=True)
    corrected_at = models.DateTimeField(null=True, blank=True)
    corrected_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="attendance_corrected"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["class_session", "student"],
                name="unique_attendance_per_session_student"
            )
        ]

    def __str__(self):
        return f"{self.student} - {self.class_session} - {self.status}"