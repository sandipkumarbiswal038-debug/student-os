
from django.db import models
from users.models import User
from subjects.models import Subject

class FacultySubject(models.Model):
    faculty = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.faculty} - {self.subject}"


