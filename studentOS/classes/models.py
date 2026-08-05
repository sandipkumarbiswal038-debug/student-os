
from django.db import models
from subjects.models import Subject

class ClassSession(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    course = models.CharField(max_length=100)
    section = models.CharField(max_length=20)
    semester = models.PositiveIntegerField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    # A cancelled / Not Held class must not contribute to attendance totals.
    happened = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.subject.subject_name} - {self.date}"
