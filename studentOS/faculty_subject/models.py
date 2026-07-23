
from django.db import models
from users.models import User
from subjects.models import Subject

class FacultySubject(models.Model):
    faculty = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="faculty_subjects"
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name="faculty_subjects"
    )

    def __str__(self):
        return f"{self.faculty.name} - {self.subject.subject_name}"


