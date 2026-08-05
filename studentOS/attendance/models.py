from django.db import models
from django.core.exceptions import ValidationError
from student.models import Student
from classes.models import ClassSession
from subjects.models import Subject
from users.models import User


class Enrollment(models.Model):
    """Explicit subject enrollment: the only students a faculty member can mark."""
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="subject_enrollments")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="student_enrollments")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["student", "subject"], name="unique_student_subject_enrollment")
        ]


class Attendance(models.Model):
    STATUS_CHOICES = [
        ("Present", "Present"),
        ("Absent", "Absent"),
    ]

    student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name="attendance_records")
    class_session = models.ForeignKey(ClassSession, on_delete=models.PROTECT, related_name="attendance_records")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    marked_at = models.DateTimeField(auto_now_add=True)
    remarks = models.TextField(blank=True)
    marked_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="marked_attendance")
    corrected_at = models.DateTimeField(null=True, blank=True)
    corrected_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True, related_name="corrected_attendance")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["student", "class_session"], name="one_attendance_per_student_session")
        ]

    def __str__(self):
        return f"{self.student} - {self.status}"

    def delete(self, *args, **kwargs):
        raise ValidationError("Attendance records cannot be deleted.")

# Create your models here.
